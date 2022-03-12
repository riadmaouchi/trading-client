import { map } from 'rxjs/operators'

import { MockEvent, EventSource } from 'mocksse'
import { fakeCurrencyPairsData } from '@/mocks/fakedata/curencyPairs'
import { fakeSystemStatusData } from '@/mocks/fakedata/systemStatus'
import { getPrice } from '@/mocks/fakedata'

const port =
    window.location.protocol === 'https:' && !window.location.port ? 443 : 8080
export const url =
    window.location.protocol +
    '//' +
    window.location.hostname +
    ':' +
    port +
    '/v1/sse'

new MockEvent({
    url,
    responses: [
        {
            id: Date.now(),
            type: 'assets',
            data: JSON.stringify({
                currencyPairs: Object.values(fakeCurrencyPairsData).map(
                    (currencyPair) => {
                        return {
                            isStale: false,
                            updateType: 'Added',
                            currencyPair,
                        }
                    }
                ),
            }),
        },
    ],
})

new MockEvent({
    url,
    setInterval: 1000,
    response: (mockEvent: any) => {
        setInterval(() => {
            fakeSystemStatusData
                .map((service) => {
                    return {
                        id: Date.now(),
                        type: 'status',
                        data: JSON.stringify({
                            ...service,
                            timestamp: Date.now(),
                        }),
                    }
                })
                .forEach((service) => mockEvent.dispatchEvent(service))
        }, mockEvent.setInterval)
    },
})

new MockEvent({
    url,
    setInterval: Math.random() * 1000,
    response: (mockEvent: any) => {
        Object.keys(fakeCurrencyPairsData).forEach((symbol) => {
            getPrice(symbol)
                .pipe(
                    map((price) => {
                        return {
                            id: Date.now(),
                            type: 'priceUpdate',
                            data: JSON.stringify(price),
                        }
                    })
                )
                .subscribe((price) => mockEvent.dispatchEvent(price))
        })
    },
})

export { EventSource as FakeEventSource }
