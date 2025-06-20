import { DedotClient, WsProvider } from 'dedot';
import type {FrameSystemAccountInfo} from "@dedot/api/chaintypes/substrate/types";

const rpc = "wss://polkadot-rpc.dwellir.com";
const addresses = [
    '1P8B9aHLLUcPrgVo1EfmvJ2yNm9Uac9RkSiNQyVxVp6yons',
    '1BzDB5n2rfSJwvuCW9deKY9XnUyys8Gy44SoX8tRNDCFBhx'
]

async function connectWsRpc (rpc: string) {
    const provider = new WsProvider({ endpoint: rpc, maxRetryAttempts: 0 });
    const client = new DedotClient({ provider, throwOnUnknownApi: false });

    client.on('connected', () => console.log('Connected', rpc));
    client.on('error', () => console.log('error'));
    client.on('ready', () => console.log('ready'));
    client.on('disconnected', () => console.log('disconnected'));

    try {
        await client.connect();
    } catch {
        console.log('err');
    }

    return client;
}

async function main() {
    const client = await connectWsRpc(rpc);
    const balance = await client.query.system.account.multi(addresses);

    console.log('balance', balance);
}

main().then().catch(console.error).finally(() => process.exit(0));

/**
 * Xử lí subscribe balance qua callback.
 */