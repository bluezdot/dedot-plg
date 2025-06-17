import { DedotClient, WsProvider } from 'dedot';
const rpc = "wss://polkadot-rpc.dwellir.com";
const fromAddress = "1P8B9aHLLUcPrgVo1EfmvJ2yNm9Uac9RkSiNQyVxVp6yons";
const toAddress = "1P8B9aHLLUcPrgVo1EfmvJ2yNm9Uac9RkSiNQyVxVp6yons";
const amount = '10000000000';


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

    console.log('isTxCurrenciesSupported', !!client && !!client && !!client.tx.currencies);
    console.log('isTxBalancesSupported', !!client && !!client.tx && !!client.tx.balances);
    console.log('isTxTokensSupported', !!client && !!client.tx && !!client.tx.tokens);
    console.log('isTxAssetsSupported', !!client && !!client.tx && !!client.tx.assets);

    const tx = client.tx.balances.transferAll(toAddress, false);
    const tx2 = client.tx.balances.transferKeepAlive(toAddress, BigInt(amount));
    client.registry

    console.log('tx', tx.toHex());
    console.log('tx2', tx2.toHex());

    // batch
    const batchTx = client.tx.utility.batchAll([
        tx.call,
        tx2.call
    ])

    console.log('batchTx', batchTx.toHex());
}

main().then().catch(console.error).finally(() => process.exit(0));

/**
 * Check hàm substrateApi.makeRpcQuery<AnyJson>(queryParams). Có gọi qua dedot đc k
 */