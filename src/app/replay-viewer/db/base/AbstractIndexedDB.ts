import { TypedIBDStore } from './AbstractIndexedBDStore';
import { r2p } from '../util';
export abstract class AbstractIndexedDB {
    private _name: string;
    private _version: number;
    private _dbPromise: Promise<void>;
    private _db: IDBDatabase;

    private _registeredStoreFactories: Map<string, (transaction: IDBTransaction) => TypedIBDStore> = new Map();
    private _storeInstances: Map<string, TypedIBDStore>;

    public get name(): string {
        return this._name;
    }

    public get version(): number {
        return this._version;
    }

    protected get rawStoreNames(): string[] {
        return Array.from(this._db.objectStoreNames);
    }

    public constructor(name: string, version: number) {
        this._name = name;
        this._version = version;
    }

    protected getStore(name: string): TypedIBDStore {
        return this._storeInstances.get(name);
    }

    protected registerStore(name: string, factory: (transaction: IDBTransaction) => TypedIBDStore) {
        this._registeredStoreFactories.set(name, factory);
    }

    protected connect(): Promise<void> {
        if (this._dbPromise) {
            return this._dbPromise;
        }
        this._dbPromise = new Promise((res, rej) => {
            const openRequest = indexedDB.open(this.name, this.version);
            openRequest.onblocked = (event: Event) => {
                console.error('onblocked', event);
                rej('upgrade blocked');
            };
            openRequest.onerror = (event: Event) => {
                rej(openRequest.error);
            };
            openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = openRequest.result;
                if (event.oldVersion === 0) {
                    this.handleCreateDB(db);
                } else {
                    this._handleUpgradeDB(db, event.oldVersion, event.newVersion);
                }
            };
            openRequest.onsuccess = (event: Event) => {
                this._db = openRequest.result;
                res();
            };
        });
        return this._dbPromise;
    }

    protected async close(): Promise<void> {
        if (this._dbPromise) {
            await this._dbPromise;
            this._db.close();
            this._dbPromise = undefined;
            this._db = undefined;
        }
    }

    private _handleUpgradeDB(db: IDBDatabase, oldVer: number, newVer: number): void {
        const transaction = db.transaction(Array.from(db.objectStoreNames), 'versionchange');
        this.handleUpgradeDB(db, transaction, oldVer, newVer);
    }

    protected abstract handleCreateDB(db: IDBDatabase): void;
    protected abstract handleUpgradeDB(db: IDBDatabase, transaction: IDBTransaction, oldVer: number, newVer: number): void;

    public async transaction(transactFn: () => Promise<void>, accessMode: 'readonly' | 'readwrite' = 'readonly', stores?: string[]) {
        await this.connect();
        stores = stores || this.rawStoreNames;
        this._storeInstances = new Map();
        const transaction = this._db.transaction(stores, accessMode);
        for (let i = 0; i < stores.length; i++) {
            const storeName = stores[i];
            const factory = this._registeredStoreFactories.get(storeName);
            if (factory) {
                this._storeInstances.set(storeName, factory(transaction));
            }
        }
        await transactFn();
        this._storeInstances = new Map();
    }

    public async delete() {
        await this.close();
        return r2p<void>(indexedDB.deleteDatabase(this.name));
    }
}
