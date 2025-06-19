import { DedotClient, WsProvider } from 'dedot';
import {PolkadotApi} from "../../chainApi/polkadot";
import {MoonbeamApi} from "../../chainApi/moonbeam";

const rpc = "wss://wss.api.moonbeam.network";
const address = "0x6F21E1C5234eC2DA8019632d4836fFCC2379DbA7";

async function connectWsRpc (rpc: string) {
    const provider = new WsProvider({ endpoint: rpc, maxRetryAttempts: 0 });
    const client = new DedotClient<MoonbeamApi>({ provider, throwOnUnknownApi: false });

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
    let identityInfo = await client.query.identity.identityOf(address)

    if (Array.isArray(identityInfo)) {
        // @ts-ignore
        identityInfo = identityInfo[0];
    }

    console.log('identityInfo', identityInfo);
}

main().then().catch(console.error).finally(() => process.exit(0));

/**
 * Xử lí subscribe balance qua callback.
 */