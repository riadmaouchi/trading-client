import {
    ConnectionStatus,
    CurrencyPairs,
    Level,
    Price,
    PriceMovements,
    Service,
    Services,
    ServiceTypes,
} from '@/services'
import {
    distinctUntilChanged,
    filter,
    groupBy,
    map,
    mapTo,
    merge,
    mergeMap,
    Observable,
    of,
    publishReplay,
    refCount,
    scan,
    share,
    switchMap,
    timer,
} from 'rxjs'
import { client } from '../client'

const HEARTBEAT_TIMEOUT = 3000

export const apiClient = {
    login: () => {
        return {
            firstName: 'Arvel',
            lastName: 'Crynyd',
            code: 'ACR',
            avatar: `${window.location.origin}/five.png`,
        }
    },
    subcribeConnectionStatus: () =>
        of({
            status: ConnectionStatus.Connected,
            url: 'http://localhost:8080',
        }),

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
