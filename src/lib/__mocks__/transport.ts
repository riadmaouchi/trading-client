import { Observable, BehaviorSubject } from 'rxjs'
import transport, { ConnectionInfo, Transport } from '../transport'

export class SseTransport implements Transport {
    public connectionState!: BehaviorSubject<ConnectionInfo>

    config!: transport

    connect(): Promise<void> {
        throw new Error('Method not implemented.')
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.')
    }
    send(url: string, data: any): Promise<void> {
        throw new Error('Method not implemented.')
    }
    onreceive<Event>(eventType: string): Observable<Event> {
        throw new Error('Method not implemented.')
    }
    onclose!: ((error?: Error | undefined) => void) | null
}
