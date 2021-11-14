import { BehaviorSubject, Observable, Observer, Subscription } from 'rxjs'
import { filter, map, share } from 'rxjs/operators'
import TransportConfig, {
    ConnectionInfo,
    ConnectionState,
    Transport,
} from '@/api/transport/transport'
import { MockEvent, EventSource } from 'mocksse'
import { fakeData as fakeAssets } from '@/api/command/asset.mock'
import { fakeData as fakeService } from '@/api/command/service.mock'

const port =
    window.location.protocol === 'https:' && !window.location.port ? 443 : 8080
const defaultUrl = window.location.origin + ':' + port + '/v1/sse'

console.log('mock defaultUrl', defaultUrl)

new MockEvent({
    url: defaultUrl,
    responses: [
        {
            id: Date.now(),
            type: 'assets',
            data: {
                currencyPairs: Object.entries(fakeAssets)
                    .map((value) => value[1])
                    .map((value) => {
                        return {
                            isStale: false,
                            updateType: 'Added',
                            currencyPair: value,
                        }
                    }),
            },
        },
    ],
})

new MockEvent({
    url: defaultUrl,
    setInterval: 1000,
    response: (mockEvent: any) => {
        console.log('mock event')
        setInterval(() => {
            fakeService
                .map((service) => {
                    return {
                        id: Date.now(),
                        type: 'status',
                        data: {
                            ...service,
                            timestamp: Date.now(),
                        },
                    }
                })
                .forEach((service) => mockEvent.dispatchEvent(service))
        }, mockEvent.setInterval)
    },
})

/*new MockEvent({
    url: defaultUrl,
    setInterval: Math.random() * 1000,
    response: (mockEvent: any) => {
        console.log('mock event')
        setInterval(() => {
            const responseData = {
                id: 'event Id One',
                type: 'priceUpdate',
                data: {
                    symbol: 'EURUSD',
                    high: 1.22347,
                    low: 1.09341,
                    asks: [
                        { quantity: 1000000, price: 1.10349 },
                        { quantity: 5000000, price: 1.1035000000000001 },
                        { quantity: 10000000, price: 1.10351 },
                    ],
                    bids: [
                        { quantity: 1000000, price: 1.10338 },
                        { quantity: 5000000, price: 1.10337 },
                        { quantity: 10000000, price: 1.1033600000000001 },
                        { quantity: 20000000, price: 1.10335 },
                    ],
                    mid: 1.10344,
                    id: 10000,
                    time: Date.now(),
                },
            }
            console.log(responseData)
            mockEvent.dispatchEvent(responseData)
        }, mockEvent.setInterval)
    },
})*/

export class MockSseTransport implements Transport {
    public connectionState!: BehaviorSubject<ConnectionInfo>
    public connected!: Observable<ConnectionState>
    public onclose: ((error?: Error | undefined) => void) | null
    public config: TransportConfig

    private eventSource?: any
    private connectedAt: any
    private lastSSEMessageTS!: Date

    constructor(url: string, port?: number) {
        this.config = new TransportConfig(url, port)
        console.log('mock transportConfig', this.config.url)
        this.onclose = null
    }

    public send<T>(url: string, data: any): Promise<T> {
        throw new Error('Method not implemented.')
    }

    public connect(): Promise<void> {
        console.log(this.config)

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

        this.eventSource = new EventSource(this.config.url + '/v1/sse')

        this.eventSource.onopen = () => {
            this.connectedAt = new Date()
            this.updateLastSSEConnectionTime()
            this.changeState(ConnectionState.Open)
        }
        this.eventSource.onerror = (evt: any) => {
            this.stop()
            this.changeState(ConnectionState.Closed)
        }

        return Promise.resolve()
    }
    public stop(): Promise<void> {
        if (this.eventSource) {
            this.eventSource.close()
            delete this.eventSource
            delete this.connectedAt

            if (this.onclose) {
                this.onclose()
            }
        }
        return Promise.resolve()
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
            map((message: MessageEvent<any>) => message.data),
            share()
        )
    }

    private changeState(connectionState: ConnectionState): void {
        this.connectionState.next({
            connectedAt: this.connectedAt,
            connectionState,
        })
    }

    private updateLastSSEConnectionTime() {
        this.lastSSEMessageTS = new Date()
    }
}
