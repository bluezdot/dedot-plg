import { LegacyClient, WsProvider } from 'dedot';
import {
    AvailApi,
    type AvailCoreDataProofMessage,
    AvailCoreDataProofMessageAddressedMessage
} from "../../chainApi/avail";
import { HexString } from "dedot/utils";

const rpc = "wss://avail.public.curie.radiumblock.co/ws";
const recipient = '0x038FFA12cE34Edd5d5aee3F9311D63E448c4C4C0';

async function connectWsRpc (rpc: string) {
    const provider = new WsProvider({ endpoint: rpc, maxRetryAttempts: 0 });
    const client = new LegacyClient<AvailApi>({ provider, throwOnUnknownApi: false });

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

function bridgeTx (client: LegacyClient<AvailApi>) {
    const message: AvailCoreDataProofMessage = {
        type: 'FungibleToken',
        value: {
            assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
            amount: BigInt('2000000000000000000')
        }
    };
    const to = `${recipient.padEnd(66, '0')}` as HexString;
    const domain = 2;

    const bridgeTx = client.tx.vector.sendMessage(message, to, domain);

    console.log(bridgeTx.toHex());
}

async function claimTx (client: LegacyClient<AvailApi>) {
    // todo
    // const metadata = notification.metadata as ClaimAvailBridgeNotificationMetadata;
    const fakeMetadataId = '';
    const fakeAddrMsg: AvailCoreDataProofMessageAddressedMessage = {
        message: {
            type: 'FungibleToken',
            value: {
                assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
                amount: BigInt('2000000000000000000')
            }
        },
        destinationDomain: 2,
        originDomain: 1,
        from: '0x123',
        to: '0x456',
        id: BigInt(1)
    }

    const latestEthHeadSlot = await getLatestEthHeadSlot();
    const latestBlockHash = await getLatestBlockHash(latestEthHeadSlot);

    const proof = await getClaimProofOnAvail(latestBlockHash, fakeMetadataId);

    const claimTx = client.tx.vector.execute(
        BigInt(latestEthHeadSlot),
        // getAddressMessage(notification), // todo
        fakeAddrMsg,
        proof.accountProof,
        proof.storageProof
    );

    console.log(claimTx.toHex());
}

async function getLatestEthHeadSlot () {
    try {
        const rawResponse = await fetch(`https://bridge-api.avail.so/eth/head`);
        const response = await rawResponse.json() as { slot: number, timestamp: number, timestampDiff: number };

        return response.slot;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function getLatestBlockHash (slot: number) {
    try {
        const rawResponse = await fetch(`https://bridge-api.avail.so/beacon/slot/${slot}`);
        const response = await rawResponse.json() as { blockHash: string, blockNumber: number };

        return response.blockHash;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function getClaimProofOnAvail (blockHash: string, messageId: string) {
    try {
        const rawResponse = await fetch(`https://bridge-api.avail.so/avl/proof/${blockHash}/${messageId}`);

        return await rawResponse.json() as { accountProof: HexString[], storageProof: HexString[] };
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function main() {
    const client = await connectWsRpc(rpc);

    bridgeTx(client);
    await claimTx(client);
}

main().then().catch(console.error).finally(() => process.exit(0));

/**
 * Xử lí subscribe balance qua callback.
 */