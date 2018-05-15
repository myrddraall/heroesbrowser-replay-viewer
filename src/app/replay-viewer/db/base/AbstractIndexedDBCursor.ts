import { r2p } from '../util';

export class TypedIDBCursor<TKey, TData> {

    private _cursor: IDBCursorWithValue;

    public constructor(private cursorRequest: IDBRequest) {
        this._cursor = cursorRequest.result;
    }

    public get value(): TData {
        return this.cursor.value;
    }

    public update(value: TData) {
        return r2p<any>(this.cursor.update(value));
    }

    public delete(value: TData) {
        return r2p<void>(this.cursor.delete());
    }

    private get cursor(): IDBCursorWithValue {
        return this._cursor;
    }

    public next(): Promise<TypedIDBCursor<TKey, TData>> {
        return new Promise((res, rej) => {
            this.cursorRequest.onsuccess = () => {
                if (this.cursorRequest.result) {
                    res(new TypedIDBCursor<TKey, TData>(this.cursorRequest));
                } else {
                    res(null);
                }
            };
            this.cursor.continue();
        });
    }

}
