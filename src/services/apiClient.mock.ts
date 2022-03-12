import { Service, Services, ServiceTypes } from '@/services'
import {
    delay,
    from,
    groupBy,
    mapTo,
    merge,
    mergeMap,
    Observable,
    of,
    scan,
    share,
    switchMap,
    timer,
} from 'rxjs'
import {
    fakeCurrencyPairsData as fakeCurrencyPairs,
    fakeSystemStatusData,
    getPrice,
} from '../mocks/fakedata'
import { ConnectionStatus, Level, Price, PriceMovements } from './types'

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
        return from(fakeSystemStatusData).pipe(
            groupBy((serviceStatus) => serviceStatus.type),
            mergeMap((serviceStatus) =>
                serviceStatus.pipe(
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
    subscribeCurrencyPairs: () => of(fakeCurrencyPairs).pipe(delay(1_000)),
    subcribePrice: (symbol: string) => {
        return getPrice(symbol).pipe(
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
