import {LegacyClient, SmoldotProvider, WsProvider} from "dedot";

type DedotProvider = WsProvider | SmoldotProvider;

const CHAIN_RPCS = require('./chain-rpcs.json') as Record<string, string[]>;

async function main() {
    const legacyChains: string[] = [
        'moonbeam',        'aleph',
        'astar',           'acala',
        'alephTest',       'aventus',
        'moonbase',        'bifrost_dot',
        'bifrost_testnet', 'calamari',
        'amplitude',       'amplitude_test',
        'clover',          'hydradx_main',
        'edgeware',        'centrifuge',
        'interlay',        'nodle',
        'darwinia2',       'sora_ksm',
        'polkadex'
    ];

    for (const [chainSlug, rpcs] of Object.entries(CHAIN_RPCS)) {
        console.log('chainSlug', chainSlug);

        if (legacyChains.includes(chainSlug)) {
            continue;
        }

        for (const rpc of rpcs) {
            let provider: DedotProvider;

            if (rpc.startsWith('light://')) {
                continue;
            } else {
                provider = new WsProvider({ endpoint: rpc, maxRetryAttempts: 1});
            }

            const client = new LegacyClient({ provider, throwOnUnknownApi: false });

            try {
                await client.connect();
            } catch {
                continue;
            }

            const rpcMethods = await client.rpc.rpc_methods();
            const hasChainHeadV1 = rpcMethods.methods.some(item => item.startsWith('chainHead_v1_'));
            const hasChainSpecV1 = rpcMethods.methods.some(item => item.startsWith('chainSpec_v1_'));
            const hasTransactionV1 = rpcMethods.methods.some(item => item.startsWith('transaction_v1_'));

            if (hasChainHeadV1 && hasChainSpecV1 && hasTransactionV1) {
                continue;
            }

            legacyChains.push(chainSlug);
            break;
        }

        console.log('legacyChains', legacyChains);
    }

    console.log('legacyChains', legacyChains);
}

main().then().catch(console.error).finally(() => process.exit(0));
