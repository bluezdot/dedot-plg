import { DedotClient, WsProvider } from 'dedot';
import type { PolkadotApi } from "@dedot/chaintypes";

async function connectMultiRpc() {
    const provider = new WsProvider({
        endpoint: [
            'wss://rpc.polkadot.io',
            'wss://polkadot-rpc.dwellir.com',
            'wss://polkadot.api.onfinality.io/public-ws'
        ]
    });

    const client = await DedotClient.new<PolkadotApi>(provider);

    await client.disconnect();
}

connectMultiRpc().then().catch(console.error);