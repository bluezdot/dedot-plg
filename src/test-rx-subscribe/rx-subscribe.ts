import { AnyFunc, GenericStorageQuery, RpcVersion } from "dedot/types";
import {defer, Observable} from "rxjs";
import { DedotClient, WsProvider } from "dedot";

export const createObservable = <F extends AnyFunc>(func: GenericStorageQuery<RpcVersion, F>, ...args: Parameters<F>): Observable<ReturnType<F>> => {
    return new Observable<ReturnType<F>>((_subscriber) => {
        let unsub: (() => void) | undefined;

        func(...args, (value: ReturnType<F>) => {
            if (!_subscriber.closed) {
                _subscriber.next(value);
            } else {
                unsub?.();
            }
        }).then(_unsub => {
                if (!_subscriber.closed) {
                    unsub = _unsub;
                }
        }).catch(err => _subscriber.error(err));

        return () => {
            unsub?.();
        };
    });
}

const provider = new WsProvider({ endpoint: 'wss://test.finney.opentensor.ai:443', maxRetryAttempts: 2 });
const client = new DedotClient({ provider, throwOnUnknownApi: false });

client.connect().then(() => {
    const queryFunc = client.query.system.account;
    const unsub = defer(() => createObservable(queryFunc, '5CFh4qpiB5PxsQvPEs6dWAhzgAVLHZa8tZKxeE9XsHBg4n9t')).subscribe({
        next: (value) => console.log(value),
        error: (err) => console.error(err),
        complete: () => console.log('Done!')
    })

    unsub.unsubscribe();
})