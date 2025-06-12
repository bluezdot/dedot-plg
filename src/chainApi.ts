import {DedotClient, WsProvider} from "dedot";
import {AlephApi, MoonbeamApi, PolkadotApi} from "@dedot/chaintypes";

const run = async () => {
    const provider = new WsProvider('wss://rpc.polkadot.io');
    const api = await DedotClient.new<MoonbeamApi>({
        provider
    });

    console.log('abc', api.consts.balances.existentialDeposit);
}

run().catch(console.error);
