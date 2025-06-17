import { DedotClient, WsProvider } from 'dedot';
import type {FrameSystemAccountInfo} from "@dedot/api/chaintypes/substrate/types";

const rpc = "wss://polkadot-rpc.dwellir.com";
const address = "1P8B9aHLLUcPrgVo1EfmvJ2yNm9Uac9RkSiNQyVxVp6yons";

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
    const balance: FrameSystemAccountInfo = await client.query.system.account(address);

    console.log('balance', balance);
}

main().then().catch(console.error).finally(() => process.exit(0));

/**
 * Xử lí subscribe balance qua callback.
 */