import { of } from 'rxjs'
import { Transport } from '..'
import { ConnectionStatus } from '../session/connection'

export const mapConnectionState = (transport: Transport) => {
    return of({
        status: ConnectionStatus.connected,
        url: 'http://localhost:8080',
    })
}
