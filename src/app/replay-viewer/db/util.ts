export function r2p<TResult>(req: IDBRequest): Promise<TResult> {
    return new Promise((res, rej) => {
        req.onerror = () => {
            rej(req.error);
        };
        req.onsuccess = () => {
            res(req.result);
        };
    });
}
