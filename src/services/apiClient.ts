import { client } from '@/services/client'
import {
    distinctUntilChanged,
    filter,
    groupBy,
    map,
    mapTo,
    merge,
    mergeMap,
    Observable,
    publishReplay,
    refCount,
    scan,
    share,
    switchMap,
    timer,
} from 'rxjs'
import { CurrencyPairs } from '@/services'
import { HttpRequest } from './client/httpClient'
import {
    Service,
    Services,
    ServiceTypes,
    ConnectionStatus,
    Level,
    Price,
    PriceMovements,
} from '@/services'
import { ConnectionState } from './client'

const HEARTBEAT_TIMEOUT = 3000

export const apiClient = {
    login: async (userId: string) => {
        const request: HttpRequest = {
            url: `http://localhost:8080/api/v1/users/${userId}`,
            method: 'GET',
        }
        const res = await client.request(request)
        return res.content
    },
    subcribeConnectionStatus: () =>
        client.connectionState.pipe(
            map((state) => {
                let status: ConnectionStatus = ConnectionStatus.Disconnected
                let url: string = client.config.url

                switch (state.connectionState) {
                    case ConnectionState.Open:
                        status = ConnectionStatus.Connected
                        break
                    case ConnectionState.Closed:
                        status = ConnectionStatus.Disconnected
                        url = 'Disconnected'
                        break
                }
                return {
                    status,
                    url,
                }
            }, distinctUntilChanged())
        ),
    subscribeSystemStatus: () => {
        const statusUpdate = client.onreceive<ServiceStateMsg>('status')
        return statusUpdate.pipe(
            map((serviceStatus) => {
                return {
                    ...serviceStatus,
                    isConnected: true,
                }
            }),
            groupBy((serviceStatus) => serviceStatus.type),
            mergeMap((serviceStatus) =>
                serviceStatus.pipe(
                    addHeartBeat(HEARTBEAT_TIMEOUT),
                    scan<Service, ServiceTypes>(
                        (serviceTypes, next) => serviceTypes.update(next),
                        new ServiceTypes(serviceStatus.key)
                    )
                )
            ),
            scan<ServiceTypes, Services>((services, serviceTypes) => {
                return services.add(serviceTypes.type, serviceTypes)
            }, new Services())
        )
    },
    subscribeCurrencyPairs: () =>
        client.onreceive<CurrencyPairUpdatesMsg>('assets').pipe(
            scan<CurrencyPairUpdatesMsg, CurrencyPairs>((acc, update) => {
                const result = { ...acc }
                update.currencyPairs.forEach((currencyPairUpdate) => {
                    if (currencyPairUpdate.updateType === UpdateTypes.Added) {
                        result[currencyPairUpdate.currencyPair.symbol] =
                            currencyPairUpdate.currencyPair
                    } else {
                        delete result[currencyPairUpdate.currencyPair.symbol]
                    }
                })

                return result
            }, {}),
            publishReplay(1),
            refCount()
        ),
    subcribePrice: (symbol: string) => {
        return client.onreceive<Price>('priceUpdate').pipe(
            filter((price) => price.symbol === symbol),
            scan<Price>((acc, price) => {
                const asks = price.asks.map((level, index) => {
                    return {
                        ...level,
                        mouvement: computeMovement(acc.asks[index], level),
                    }
                })

                const bids = price.bids.map((level, index) => {
                    return {
                        ...level,
                        mouvement: computeMovement(acc.bids[index], level),
                    }
                })
                return { ...price, asks, bids }
            }),
            debounce<Price>(5000, (price) => {
                return {
                    ...price,
                    priceStale: true,
                }
            }),

            share()
        )
    },
}

const debounce =
    <T>(
        time: number,
        value: (lastValue: T) => T
    ): ((source: Observable<T>) => Observable<T>) =>
    (source) => {
        const timeout = source.pipe(
            switchMap((last) => timer(time).pipe(mapTo(value(last))))
        )
        return merge(source, timeout)
    }

const computeMovement = (prevLevel: Level, nexLevel: Level) => {
    const prevPriceMove = prevLevel.mouvement || PriceMovements.None
    const lastPrice = prevLevel.price
    const nextPrice = nexLevel.price
    if (lastPrice < nextPrice) {
        return PriceMovements.Up
    }
    if (lastPrice > nextPrice) {
        return PriceMovements.Down
    }
    return prevPriceMove
}

const addHeartBeat = (
    heartBeatTimeout: number
): ((source: Observable<Service>) => Observable<Service>) => {
    return (source) =>
        source.pipe(
            groupBy((serviceStatus) => serviceStatus.id),
            mergeMap((service$) =>
                service$.pipe(
                    debounce<Service>(heartBeatTimeout, (lastValue) => {
                        return {
                            ...lastValue,
                            timestamp: NaN,
                            isConnected: false,
                        }
                    }),
                    distinctUntilChanged<Service>(
                        (status, statusNew) =>
                            status.isConnected === statusNew.isConnected
                    )
                )
            )
        )
}

interface CurrencyPairMsg {
    symbol: string
    ratePrecision: number
    pipsPosition: number
    base: string
    terms: string
}

enum UpdateTypes {
    Added = 'Added',
    Removed = 'Removed',
}

interface CurrencyPairUpdateMsg {
    updateType: UpdateTypes
    currencyPair: CurrencyPairMsg
}

interface CurrencyPairUpdatesMsg {
    isStale: boolean
    currencyPairs: CurrencyPairUpdateMsg[]
}

interface ServiceStateMsg {
    type: string
    id: string
    timestamp: number
}
