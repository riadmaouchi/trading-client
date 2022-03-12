import { Request, Response } from '@/services/client/httpClient'
import { BehaviorSubject, Observable } from 'rxjs'
import ConnectionConfig, { ConnectionInfo, Connection } from '../connection'

export class SseConnection implements Connection {
    request(data: Request): Promise<Response> {
        throw new Error('Method not implemented.')
    }
    send(data: any): Promise<void> {
        throw new Error('Method not implemented.')
    }
    public connectionState!: BehaviorSubject<ConnectionInfo>

    config!: ConnectionConfig

    connect(): Promise<void> {
        throw new Error('Method not implemented.')
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.')
    }

    onreceive<Event>(eventType: string): Observable<Event> {
        throw new Error('Method not implemented.')
    }
    onclose!: ((error?: Error | undefined) => void) | null
}
