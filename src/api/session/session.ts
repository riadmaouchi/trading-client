import { Transport } from '../transport'
import { mapAssets, mapServices, mapConnectionState } from '../command'

export interface Account {
    readonly firstName: string
    readonly lastName: string
    readonly code: string
    readonly avatar: string
}

export const Session = {
    logIn(): Account {
        return {
            firstName: 'Arvel',
            lastName: 'Crynyd',
            code: 'ACR',
            avatar: `${window.location.origin}/five.png`,
        }
    },

    initAssets(transport: Transport) {
        return mapAssets(transport)
    },

    connect(transport: Transport) {
        return mapConnectionState(transport)
    },

    serviceStatus(transport: Transport, heartBeatTimeout: number) {
        return mapServices(transport, heartBeatTimeout)
    },
}
