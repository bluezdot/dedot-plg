import {DedotClient, JsonRpcClient, LegacyClient, WsProvider, } from 'dedot';
import {ensurePresence, assert} from '@dedot/utils';
import type {AlephApi, PolkadotApi} from '@dedot/chaintypes';

async function main() {
    // Initialize providers & clients
    const provider = new WsProvider({ endpoint: 'wss://sys.ibp.network/asset-hub-polkadot', maxRetryAttempts: 0 });
    const client = new LegacyClient({ provider, throwOnUnknownApi: false });

    client.on('connected', () => console.log('Connected'));
    client.on('error', () => console.log('error'));
    client.on('ready', () => console.log('ready'));
    client.on('disconnected', () => console.log('disconnected'));

    try {
        await client.connect();
    } catch {
        console.log('err');
    }

    const test = await client.query.assets.asset.pagedEntries({
        pageSize: 500
    });

    console.log('test', test.length);

    console.log('done')
}

main().then().catch(console.error).finally(() => process.exit(0));