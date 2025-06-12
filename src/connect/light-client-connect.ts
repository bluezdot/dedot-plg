import {DedotClient, JsonRpcClient, SmoldotProvider, WsProvider} from 'dedot';
import type { PolkadotApi } from '@dedot/chaintypes';
import * as smoldot from 'smoldot';
import {polkadot, westend2} from "@substrate/connect-known-chains";

async function main() {
    const rpc = 'light://substrate-connect/polkadot';
    const provider = createDeDotProvider(rpc);
    const client = new DedotClient(provider);

    client.connect();

    console.log('123', client.status);
    await new Promise( resolve => setTimeout(resolve, 79) );
    console.log('123', client.status);
}

function createDeDotProvider (apiUrl: string) {
    if (apiUrl.startsWith('light://')) {
        const client = smoldot.start();
        const specLink = apiUrl.replace('light://substrate-connect/', '');
        const [relayName, paraName] = specLink.split('/');

        if (!paraName) {
            const relayChain = client.addChain({ chainSpec: polkadot });

            return new SmoldotProvider(relayChain);
        }

        const paraChain = client.addChain({ chainSpec: westend2 });

        return new SmoldotProvider(paraChain);
    } else {
        return new WsProvider({
            endpoint: apiUrl,
            maxRetryAttempts: 0
        });
    }
}

main().then().catch(console.error);