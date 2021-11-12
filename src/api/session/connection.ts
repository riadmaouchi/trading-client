export enum ConnectionStatus {
    connected = 'connected',
    disconnected = 'disconnected',
    sessionExpired = 'sessionExpired',
}

export interface ConnectionInfo {
    status: ConnectionStatus
    url: string
}
