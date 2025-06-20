import { DedotClient, WsProvider } from 'dedot';
import { Contract } from 'dedot/contracts';
import { AznsRegistryContractApi } from "../../contractApi/azns-registry";

const rpc = "wss://aleph-zero.api.onfinality.io/public-ws";
const address = '5DLzvenV94wuie8XRJoUdNEvwnRWX8srQwBDtPHXdYnSKP9X';
const contractAddress = '5CTQBfBC9SfdrCDBJdfLiyW2pg9z5W6C6Es8sK313BLnFgDf';

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
    const abi = await import((`./azero_abi.json`)) as unknown as any;

    const contract = new Contract<AznsRegistryContractApi>(client, abi, contractAddress, { defaultCaller: address});

    const traitsOwner = await contract.query.psp34TraitsGetOwner();
    const names = await contract.query.getNamesOfAddress(address)
    const uri = await contract.query.getBaseUri()

    const balance = await contract.query.psp34BalanceOf(address);
    const ownersTokenByIndex = await contract.query.psp34EnumerableOwnersTokenByIndex(address, BigInt(0));

    if (ownersTokenByIndex.data.isOk) {

        if (ownersTokenByIndex.data.value.type === 'Bytes') {
            const hex = ownersTokenByIndex.data.value.value
            const cleanHex = hex.replace(/^0x/i, '').replace(/\s/g, '');
            const tokenId = Buffer.from(cleanHex, 'hex').toString('utf8')
            console.log('tokenId', tokenId);
        } else {

            console.log(ownersTokenByIndex.data.value.value);
        }
    }

    // const psp34Uri = await contract.query.psp34TraitsTokenUri() // todo: cần token id

    // Không support contract v4
    // const root = await contract.storage.root();
    // const { name, symbol, decimals } = root;
    // console.log(name, symbol, decimals);
}

main().then().catch(console.error).finally(() => process.exit(0));