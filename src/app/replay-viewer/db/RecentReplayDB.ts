
import { ReplayDescription } from '@heroesbrowser/heroprotocol';
import { AbstractIndexedDB } from './base/AbstractIndexedDB';
import { TypedIBDStore } from './base/AbstractIndexedBDStore';

export interface IRecentReplayDescription extends ReplayDescription {
    lastAccessed: Date;
}


export interface IRecentReplayData {
    fingerPrint: string;
    data: ArrayBuffer;
}

export class RecentReplayStore extends TypedIBDStore<string, IRecentReplayDescription> {

    public constructor(transaction: IDBTransaction) {
        super('replays', transaction);
    }

    public async getAll(): Promise<IRecentReplayDescription[]> {
        const result: IRecentReplayDescription[] = [];
        let cursor = await this.cursor(undefined, undefined, 'idx_lastAccessed');
        while (cursor) {
            result.push(cursor.value);
            cursor = await cursor.next();
        }
        return result;
    }
}


export class RecentReplayDataStore extends TypedIBDStore<string, IRecentReplayData> {
    public constructor(transaction: IDBTransaction) {
        super('replay-data', transaction);
    }
}


/*
export class RecentReplayStore extends AbstractIndexedDB<string, IRecentReplayDescription> {
    constructor() {
        super('replays');
    }

    public createStore(db: IDBDatabase) {
        const store = db.createObjectStore('replays', { keyPath: 'fingerPrint' });
        store.createIndex('idx_lastAccessed', 'lastAccessed');
    }

    public upgradeStore(db: IDBDatabase, fromVersion: number, toVerion: number) {
        throw new Error('Method not implemented.');
    }

}*/
export class RecentReplayDB extends AbstractIndexedDB {

    public constructor() {
        super('recent-replays', 1);
        this.registerStore('replays', (transaction) => {
            return new RecentReplayStore(transaction);
        });

        this.registerStore('replay-data', (transaction) => {
            return new RecentReplayDataStore(transaction);
        });
    }


    public get recentReplayStore(): RecentReplayStore {
        return this.getStore('replays');
    }

    public get recentReplayDataStore(): RecentReplayDataStore {
        return this.getStore('replay-data');
    }

    protected handleCreateDB(db: IDBDatabase): void {
        let store = db.createObjectStore('replays', { keyPath: 'fingerPrint' });
        store.createIndex('idx_lastAccessed', 'lastAccessed');

        store = db.createObjectStore('replay-data', { keyPath: 'fingerPrint' });
    }
    protected handleUpgradeDB(db: IDBDatabase, transaction: IDBTransaction, oldVer: number, newVer: number): void {
        throw new Error('Method not implemented.');
    }
}
