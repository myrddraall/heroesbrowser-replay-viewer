import { TypedIDBCursor } from './AbstractIndexedDBCursor';
import { r2p } from '../util';

export class TypedIDBKeyRange<TKey> extends IDBKeyRange {
    public readonly lower: TKey;
    readonly lowerOpen: boolean;
    readonly upper: TKey;
    readonly upperOpen: boolean;

    public static bound<TKey>(lower: TKey, upper: TKey, lowerOpen?: boolean, upperOpen?: boolean): TypedIDBKeyRange<TKey> {
        return <TypedIDBKeyRange<TKey>>IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen);
    }
    public static lowerBound<TKey>(lower: any, open?: boolean): TypedIDBKeyRange<TKey> {
        return <TypedIDBKeyRange<TKey>>IDBKeyRange.bound(lower, open);
    }
    public static only<TKey>(value: TKey): TypedIDBKeyRange<TKey> {
        return <TypedIDBKeyRange<TKey>>IDBKeyRange.only(value);
    }
    public static upperBound<TKey>(upper: any, open?: boolean): TypedIDBKeyRange<TKey> {
        return <TypedIDBKeyRange<TKey>>IDBKeyRange.bound(upper, open);
    }
}

export interface TypedIDBArrayKey<TKey> extends Array<TKey | TypedIDBArrayKey<TKey>> {
}


export abstract class TypedIBDStore
    <TKey extends (string | number | Date) = any, TData = any> {

    private _name: string;
    private _transaction: IDBTransaction;

    public get name(): string {
        return this._name;
    }

    protected get transaction(): IDBTransaction {
        return this._transaction;
    }

    protected get store(): IDBObjectStore {
        return this.transaction.objectStore(this.name);
    }

    public constructor(name: string, transaction: IDBTransaction) {
        this._name = name;
        this._transaction = transaction;
    }

    public add(value: TData, key?: TypedIDBKeyRange<TKey> | TypedIDBArrayKey<TKey> | TKey) {
        return r2p<TKey>(this.store.add(value, key));
    }

    public put(value: TData, key?: TypedIDBKeyRange<TKey> | TypedIDBArrayKey<TKey> | TKey) {
        return r2p<TKey>(this.store.put(value, key));
    }
    public clear() {
        return r2p<void>(this.store.clear());
    }

    public count(key?: TypedIDBKeyRange<TKey> | TypedIDBArrayKey<TKey> | TKey) {
        return r2p<number>(this.store.count(key));
    }

    public delete(key: TypedIDBKeyRange<TKey> | TypedIDBArrayKey<TKey> | TKey) {
        return r2p<void>(this.store.delete(key));
    }

    public get(key: TKey) {
        return r2p<TData>(this.store.get(key));
    }

    public async getAll(): Promise<TData[]> {
        const result: TData[] = [];
        let cursor = await this.cursor();
        while (cursor) {
            result.push(cursor.value);
            cursor = await cursor.next();
        }
        return result;
    }

    public cursor<TIndexKey>(
        range?: TypedIDBKeyRange<TIndexKey> | TypedIDBArrayKey<TIndexKey> | TIndexKey,
        direction?: IDBCursorDirection,
        index = 'primary'
    ): Promise<TypedIDBCursor<TIndexKey, TData>> {
        let cursorRequest: IDBRequest;
        if (index === 'primary') {
            cursorRequest = this.store.openCursor(<any>range, direction);
        } else {
            cursorRequest = this.store.index(index).openCursor(<any>range, direction);
        }

        return new Promise((res, rej) => {
            cursorRequest.onerror = () => {
                rej(cursorRequest.error);
            };
            cursorRequest.onsuccess = () => {
                if (cursorRequest.result === null) {
                    res(null);
                } else {
                    res(new TypedIDBCursor(cursorRequest));
                }
            };
        });
    }
}
