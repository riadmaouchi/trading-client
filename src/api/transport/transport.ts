import { BehaviorSubject, Observable, Observer, Subscription } from 'rxjs'
import { filter, map, share } from 'rxjs/operators'
import { HttpClient } from './httpClient'
import { ReconnectPolicy, RetryPolicy } from './retryPolicy'

export interface Transport {
    connect(): Promise<void>
    stop(): Promise<void>
    send(url: string, data: any): Promise<void>
    onreceive<Event>(eventType: string): Observable<Event>
    onclose: ((error?: Error) => void) | null
    connectionState: BehaviorSubject<ConnectionInfo>
    config: TransportConfig
}

export enum ConnectionState {
    Open = 'OPEN',
    Connecting = 'CONNECTING',
    Closed = 'CLOSED',
}

export interface ConnectionInfo {
    connectionState: ConnectionState
    connectedAt?: Date
}

export default class TransportConfig {
    public url: string
    public messageTimeout: number = 30 * 1000
    public maxDelay: number = 10 * 1000
    public keepAliveCheckInterval: number = 2 * 1000
    public startingDelay: number = 60 * 1000

    constructor(url: string, port?: number) {
        const securePort = 443
        const useSecure = location.protocol === 'https:' || port === securePort
        const defaultPort = port ? port : 8080
        this.url = `${location.protocol}//${url}:${
            useSecure ? securePort : defaultPort
        }`
    }
}

export class SseTransport implements Transport {
    public connectionState!: BehaviorSubject<ConnectionInfo>
    public connected!: Observable<ConnectionState>
    public config: TransportConfig
    public onclose: ((error?: Error) => void) | null
    private readonly httpClient: HttpClient
    private readonly retryPolicy: RetryPolicy
    private lastMessage!: Date
    private connectedAt?: Date
    private eventSource: any

    private sseInterval!: ReturnType<typeof setInterval>
    private reconnectionTimeout!: ReturnType<typeof setTimeout>

    constructor(httpClient: HttpClient, url: string, port?: number) {
        this.config = new TransportConfig(url, port)
        this.retryPolicy = new ReconnectPolicy(this.config.maxDelay)
        this.httpClient = httpClient
        this.httpClient.url = this.config.url
        this.onclose = null
    }

    public async send<T>(url: string, data: any): Promise<T> {
        return this.httpClient.post(url, data)
    }

    public onreceive<Event>(eventType: string): Observable<Event> {
        const observable = new Observable(
            (messages: Observer<MessageEvent<string>>) => {
                const subscription: Subscription = this.connected.subscribe(
                    () =>
                        this.eventSource?.addEventListener(
                            eventType,
                            (message: any) => messages.next(message)
                        )
                )
                return () => subscription.unsubscribe()
            }
        )
        return observable.pipe(
            map((message: MessageEvent<string>) => JSON.parse(message.data)),
            share()
        )
    }

    public async connect(): Promise<void> {
        this.connectionState = new BehaviorSubject<ConnectionInfo>({
            connectionState: ConnectionState.Closed,
        })

        this.connected = this.connectionState.pipe(
            map(
                (connectionInfo: ConnectionInfo) =>
                    connectionInfo.connectionState
            ),
            filter(
                (connectionState: ConnectionState) =>
                    connectionState === ConnectionState.Open
            )
        )

        this.init()
        this.setupConnection()
        return Promise.resolve()
    }

    public stop(): Promise<void> {
        clearInterval(this.sseInterval)
        clearTimeout(this.reconnectionTimeout)
        this.close()
        return Promise.resolve()
    }

    private changeState(connectionState: ConnectionState): void {
        this.connectionState.next({
            connectedAt: this.connectedAt,
            connectionState,
        })
    }

    private updateLastConnectionTime() {
        this.lastMessage = new Date()
    }

    private close(e?: Error) {
        if (this.eventSource) {
            this.eventSource.close()
            delete this.eventSource
            delete this.connectedAt

            if (this.onclose) {
                this.onclose(e)
            }
        }
    }

    private init(): void {
        this.changeState(ConnectionState.Connecting)
        this.eventSource = new EventSource(this.config.url + '/v1/sse')

        try {
            this.eventSource.addEventListener('keepalive', () => {
                try {
                    this.updateLastConnectionTime()
                } catch (error: any) {
                    this.close(error)
                    return
                }
            })
            this.eventSource.onopen = () => {
                this.connectedAt = new Date()
                this.updateLastConnectionTime()
                this.changeState(ConnectionState.Open)
            }
            this.eventSource.onerror = (evt: any) => {
                console.debug('Error:', evt)
                this.close()
                this.changeState(ConnectionState.Closed)
            }
        } catch (e) {
            return
        }
    }

    private setupConnection() {
        this.sseInterval = setInterval(() => {
            if (this.isConnectionExpired()) {
                const randomReconnectionInterval = this.isExceedsLimit()
                    ? 0
                    : this.retryPolicy.nextRetryDelayInMilliseconds()

                this.stop()
                console.debug(
                    `Connection is expired. Will reconnect in ${randomReconnectionInterval}ms`
                )
                this.reconnectionTimeout = setTimeout(() => {
                    this.init()
                    this.setupConnection()
                }, randomReconnectionInterval)
            }
        }, this.config.keepAliveCheckInterval)
    }

    public isConnectionExpired() {
        return (
            !this.lastMessage ||
            new Date().getTime() - this.lastMessage.getTime() >
                this.config.messageTimeout
        )
    }

    private isExceedsLimit() {
        return (
            this.connectedAt &&
            new Date().getTime() - this.connectedAt.getTime() >
                this.config.startingDelay
        )
    }
}
