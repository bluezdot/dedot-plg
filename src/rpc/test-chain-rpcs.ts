import {LegacyClient, SmoldotProvider, WsProvider} from "dedot";

const CHAIN_RPCS = require('./chain-rpcs.json') as Record<string, string[]>;

async function main() {
    const legacyChains: string[] = [
        'moonbeam',            'aleph',           'astar',
        'acala',               'alephTest',       'aventus',
        'moonbase',            'bifrost_dot',     'bifrost_testnet',
        'calamari',            'amplitude',       'amplitude_test',
        'clover',              'hydradx_main',    'edgeware',
        'centrifuge',          'interlay',        'nodle',
        'darwinia2',           'sora_ksm',        'polkadex',
        'composableFinance',   'phala',           'crust',
        'karura',              'kilt',            'basilisk',
        'altair',              'kintsugi',        'picasso',
        'zeitgeist',           'shadow',          'robonomics',
        'crabParachain',       'chainx',          'acala_testnet',
        'mangatax_para',       'origintrail',     'kabocha',
        'ternoa',              'pendulum',        'kilt_peregrine',
        'xx_network',          'frequency',       'ipci',
        'shiden',              'logion',          'polymesh',
        'sora_substrate',      'joystream',       'krest_network',
        'deeper_network',      'energy_web_x',    'manta_network',
        'polimec',             'xcavate',         'energy_web_x_testnet',
        'energy_web_x_rococo', 'liberlandTest',   'liberland',
        'tangleTest',          'dentnet',         'hydradx_rococo',
        'creditcoinTest',      'acurast',         'humanode',
        'dbcchain',            'availTuringTest', 'avail_mainnet',
        'curio',               'peaq',            'cere',
        'creditcoin_native',   'tangle',          'jamton'
    ];

    for (const [chainSlug, rpcs] of Object.entries(CHAIN_RPCS)) {
        console.log('chainSlug', chainSlug);

        if (legacyChains.includes(chainSlug)) {
            continue; // skip known legacy chains
        }

        for (const rpc of rpcs) {
            let provider: WsProvider;

            if (rpc.startsWith('light://')) {
                continue; // skip light rpc
            } else {
                provider = new WsProvider({ endpoint: rpc, maxRetryAttempts: 0});
            }

            const client = new LegacyClient({ provider, throwOnUnknownApi: false });

            try {
                await client.connect();
            } catch {
                continue; // skip disconnect chains
            }

            const rpcMethods = await client.rpc.rpc_methods();
            const hasChainHeadV1 = rpcMethods.methods.some(item => item.startsWith('chainHead_v1_'));
            const hasChainSpecV1 = rpcMethods.methods.some(item => item.startsWith('chainSpec_v1_'));
            const hasTransactionV1 = rpcMethods.methods.some(item => item.startsWith('transaction_v1_'));

            if (hasChainHeadV1 && hasChainSpecV1 && hasTransactionV1) {
                continue; // skip new rpc
            }

            legacyChains.push(chainSlug);
            break; // only need to check one old rpc
        }

        console.log('legacyChains', legacyChains);
    }

    console.log('legacyChains', legacyChains);
}

main().then().catch(console.error).finally(() => process.exit(0));
