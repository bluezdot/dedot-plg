import { DedotClient, WsProvider } from 'dedot';
import type { PolkadotApi } from '@dedot/chaintypes';

async function main() {
    // Initialize providers & clients
    const provider = new WsProvider({
        endpoint: 'wss://pioneer-rpc-3.bit.country/wss',
        maxRetryAttempts: 1
    });
    const client = new DedotClient(provider);

    client.connect().then(() => console.log('123')).catch(() => {
        client.off('disconnected')
        client.off('connected')
    });

    client.on('disconnected', () => console.log('disconnected'));
    client.on('connected', () => console.log('connected'));
}

main().then().catch(console.error);