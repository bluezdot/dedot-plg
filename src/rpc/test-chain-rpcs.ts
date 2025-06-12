import {LegacyClient, WsProvider} from "dedot";

const CHAIN_RPCS = require('./chain-rpcs.json') as Record<string, string[]>;

Object.entries(CHAIN_RPCS).forEach(([chainSlug, rpcs]) => {
    rpcs.forEach((rpc) => {
        const provider = new WsProvider(rpc);
        const client = new LegacyClient({ provider, throwOnUnknownApi: false });
    })
})