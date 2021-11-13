import { Observable, BehaviorSubject } from 'rxjs'
import { HttpClient } from './httpClient'
import TransportConfig, {
    ConnectionInfo,
    ConnectionState,
    Transport,
} from './transport'

export class DefaultTransport implements Transport {
    public connectionState!: BehaviorSubject<ConnectionInfo>

    constructor(httpClient: HttpClient, url: string, port?: number) {
        this.config = new TransportConfig(url, port)
        this.onclose = null
        console.log(this.config)
    }

    connect(): Promise<void> {
        this.connectionState = new BehaviorSubject<ConnectionInfo>({
            connectionState: ConnectionState.Open,
        })
        return Promise.resolve()
    }
    stop(): Promise<void> {
        return Promise.resolve()
    }
    send(url: string, data: any): Promise<void> {
        throw new Error('Method not implemented.')
    }
    onreceive<Event>(eventType: string): Observable<Event> {
        throw new Error('Method not implemented.')
    }
    onclose: ((error?: Error | undefined) => void) | null
    config: TransportConfig
}
