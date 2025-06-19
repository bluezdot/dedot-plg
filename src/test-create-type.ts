import {connectWsRpc} from "./utils";
import {$Weight, $Extrinsic, $Payload} from "@dedot/codecs";
import {Extrinsic, Weight} from "dedot/codecs";

const rpc = "wss://sys.ibp.network/asset-hub-westend";
const toAddress = "5CSq2pKDUZD8xKfyqNBfdmTt7kmVnH41MFiED7z9QQnaoQnF";
const amount = '1000000000000';

const addresses: string[] = [
    '5DoJJaDvjZsEdBvGip3uQz8RHbT7tT7rkwGeZZ789DcoM29n',

]

async function main() {
    const client = await connectWsRpc(rpc);

    const tx = client.tx.balances.transferKeepAlive(toAddress, BigInt(amount));

    const txHex = tx.toHex();

    const weight: Weight = $Weight.tryDecode({
        refTime: 3407872,
        proofSize: 32490000000
    })
    // const extrinsic: Extrinsic = $Extrinsic(client.registry).tryDecode({payload: txHex});

    console.log('weight', weight);
    // console.log('extrinsic', extrinsic);

    const payload = $Payload.tryDecode(txHex);
    console.log('payload', payload);
}

main().then().catch(console.error).finally(() => process.exit(0));

/**
 * Xử lí subscribe balance qua callback.
 */