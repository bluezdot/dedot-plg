import { DedotClient, SmoldotProvider, WsProvider } from 'dedot';
import * as smoldot from 'smoldot';
import { polkadot } from "@substrate/connect-known-chains";

const defineRpcs: string[] = [
    "wss://polkadot-rpc.dwellir.com",
    "wss://polkadot.public.curie.radiumblock.co/ws",
    "wss://dot-rpc.stakeworld.io",
    "wss://rpc-polkadot.luckyfriday.io",
    "wss://polkadot-rpc-tn.dwellir.com",
    "wss://rpc.ibp.network/polkadot",
    "light://substrate-connect/polkadot",
    "wss://polkadot-public-rpc.blockops.network/ws",
    "wss://rockx-dot.w3node.com/polka-public-dot/ws",
    "wss://polkadot-rpc.publicnode.com",
    "wss://polkadot.api.onfinality.io/public-ws",
    "wss://rpc-polkadot.helixstreet.io",
    "wss://polkadot.dotters.network",
    "wss://polkadot.rpc.permanence.io"
]

async function connectRpc (rpc: string) {
    if (rpc.startsWith('light://')) {
        await connectLightRpc(rpc);
    }

    await connectWsRpc(rpc);
}

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

    const rpcMethods = await client.rpc.rpc_methods();
    const hasChainHeadV1 = rpcMethods.methods.some(item => item.startsWith('chainHead_v1_'));
    const hasChainSpecV1 = rpcMethods.methods.some(item => item.startsWith('chainSpec_v1_'));
    const hasTransactionV1 = rpcMethods.methods.some(item => item.startsWith('transaction_v1_'));

    console.log('hasChainHeadV1', hasChainHeadV1);
    console.log('hasChainSpecV1', hasChainSpecV1);
    console.log('hasTransactionV1', hasTransactionV1);
}

async function connectLightRpc (rpc: string) {
    const smoldotClient = smoldot.start();
    const chain = await smoldotClient.addChain({ chainSpec: polkadot });
    const provider = new SmoldotProvider(chain);
    const client = new DedotClient({ provider });

    try {
        await client.connect();
    } catch {
        console.log('err');
    }

    const genesisHash = await client.chainSpec.genesisHash();
    console.log('GenesisHash:', genesisHash);

    const BINANCE_WALLET = '16ZL8yLyXv3V3L3z9ofR1ovFLziyXaN1DPq4yffMAZ9czzBD';
    const balance = await client.query.system.account(BINANCE_WALLET);
    console.log('Balance:', balance);

    await client.disconnect();
    await smoldotClient.terminate();
}

async function main() {
    for (const rpc of defineRpcs) {
        await connectRpc(rpc);
    }
}

main().then().catch(console.error).finally(() => process.exit(0));

/**
 * Kết nối bằng light client query các kiểu ok, nhưng cứ bị throw error sau khi chạy xong hết
 */