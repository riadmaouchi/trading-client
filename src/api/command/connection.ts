import { distinctUntilChanged, map } from 'rxjs'
import { ConnectionState, Transport } from '..'
import { ConnectionStatus } from '../session/connection'

export const mapConnectionState = (transport: Transport) => {
    return transport.connectionState.pipe(
        map((state) => {
            let status: ConnectionStatus = ConnectionStatus.disconnected
            let url: string = transport.config.url

            switch (state.connectionState) {
                case ConnectionState.Open:
                    status = ConnectionStatus.connected
                    break
                case ConnectionState.Closed:
                    status = ConnectionStatus.disconnected
                    url = 'Disconnected'
                    break
            }
            return {
                status,
                url,
            }
        }, distinctUntilChanged())
    )
}
