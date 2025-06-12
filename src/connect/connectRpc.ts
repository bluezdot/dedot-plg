import {DedotClient, JsonRpcClient, LegacyClient, WsProvider, } from 'dedot';
import {ensurePresence, assert} from '@dedot/utils';
import type {AlephApi, PolkadotApi} from '@dedot/chaintypes';

async function main() {
    // Initialize providers & clients
    const provider = new WsProvider('wss://acala-rpc-1.aca-api.network');
    const client = new LegacyClient({ provider, throwOnUnknownApi: false });

    client.on('connected', () => console.log('Connected'));
    client.on('error', () => console.log('error'));
    client.on('ready', () => console.log('ready'));
    client.on('disconnected', () => console.log('disconnected'));

    await client.connect()

    console.log(await client.rpc.system_version());
    console.log(!!client.tx.nominationPools.migrateDelegation);

    // if ('migrateDelegation' in client.tx.nominationPools) {
    // console.log(assert(client.tx.nominationPools.migrateDelegation))
    // console.log("substrateApi.client.tx.nominationPools", !!client.tx.nominationPools.migrateDelegation)
    // }

    console.log('done')

    // // Call rpc `state_getMetadata` to fetch raw scale-encoded metadata and decode it.
    // const metadata = await client.rpc.state_getMetadata();
    // console.log('Metadata:', metadata);
    //
    // // Query on-chain storage
    // const balance = await client.query.system.account('1BzDB5n2rfSJwvuCW9deKY9XnUyys8Gy44SoX8tRNDCFBhx');
    // console.log('Balance:', balance);
    //
    // // Subscribe to on-chain storage changes
    // const unsub = await client.query.system.number((blockNumber) => {
    //     console.log(`Current block number: ${blockNumber}`);
    // });
    //
    // // Get pallet constants
    // const ss58Prefix = client.consts.system.ss58Prefix;
    // console.log('Polkadot ss58Prefix:', ss58Prefix);
    //
    // // Call runtime api
    // const pendingRewards = await client.call.nominationPoolsApi.pendingRewards('1BzDB5n2rfSJwvuCW9deKY9XnUyys8Gy44SoX8tRNDCFBhx')
    // console.log('Pending rewards:', pendingRewards);
    //
    // // Unsubcribe to storage changes & disconnect from the network
    // await unsub();
    // await client.disconnect();
}

main().then().catch(console.error).finally(() => process.exit(0));