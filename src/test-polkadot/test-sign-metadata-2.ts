import * as kr from "@subwallet/keyring";
import {cryptoWaitReady} from "@polkadot/util-crypto";
import { DedotClient, ExtraSignedExtension, signRawMessage, WsProvider } from 'dedot';
import { SignerPayloadJSON, SignerResult } from 'dedot/types';
import {HexString, u8aToHex } from 'dedot/utils';
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

    const signer = {
        signPayload: async (payload: SignerPayloadJSON): Promise<SignerResult>  => {
            const extra = new ExtraSignedExtension({registry: client.registry, options: {}} as any as DedotClient, { signerAddress: payload.address });
            await extra.fromPayload(payload);

            const rawPayload = extra.toRawPayload(payload.method as HexString).data;
            const signature = u8aToHex(signRawMessage(keyPair, rawPayload));

            return {
                signature,
                id: 1
            }
        }
    }

    await tx.sign(keyPair.address, { signer });

    console.log('tx-sign', tx.toHex());

    // await tx.send();
}

main().catch(console.error).finally(() => process.exit(0));