import * as kr from "@subwallet/keyring";
import {cryptoWaitReady} from "@polkadot/util-crypto";
import { DedotClient, WsProvider } from 'dedot';
const rpc = "wss://sys.ibp.network/asset-hub-westend";
const toAddress = "5CSq2pKDUZD8xKfyqNBfdmTt7kmVnH41MFiED7z9QQnaoQnF";
const amount = '1000000000000';

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

const main = async () => {
    await cryptoWaitReady()

    const keyring = new kr.Keyring({ type: 'sr25519' });
    keyring.changeMasterPassword('123123123');
    const suri = 'xxx';
    const keyPair = keyring.createFromUri(suri, {}, 'sr25519');

    const client = await connectWsRpc(rpc);
    const tx = client.tx.balances.transferKeepAlive(toAddress, BigInt(amount));

    console.log('tx', tx.toHex());

    await tx.sign(keyPair);

    console.log('tx-sign', tx.toHex());

    // await tx.send();
}

main().catch(console.error).finally(() => process.exit(0));