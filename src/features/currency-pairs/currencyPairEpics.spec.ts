import { currencyPairEpic } from './currencyPairEpics'
import { updateCurrencyPairs } from './currencyPairSlice'
import { TestScheduler } from 'rxjs/testing'
import { connect, disconnect } from '../connection-status/connectionSlice'

jest.mock('../../api/transport')

const testScheduler = new TestScheduler((actual, expected) => {
    return expect(actual).toEqual(expected)
})
describe('Test CurrencyPairEpic', () => {
    beforeEach(() => {
        testScheduler.frame = 0
    })

    test('Updates currency pairs', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', {
                a: connect(),
                b: disconnect(),
                c: updateCurrencyPairs({
                    EURUSD: {
                        symbol: 'EURUSD',
                        ratePrecision: 5,
                        pipsPosition: 4,
                        base: 'EUR',
                        terms: 'USD',
                    },
                    GBPUSD: {
                        symbol: 'GBPUSD',
                        ratePrecision: 5,
                        pipsPosition: 4,
                        base: 'GBP',
                        terms: 'USD',
                    },
                }),
            })
            const state$ = {}

            const dependencies = {
                api: {
                    subscribeCurrencyPairs: () =>
                        cold('--c', {
                            c: {
                                EURUSD: {
                                    symbol: 'EURUSD',
                                    ratePrecision: 5,
                                    pipsPosition: 4,
                                    base: 'EUR',
                                    terms: 'USD',
                                },
                                GBPUSD: {
                                    symbol: 'GBPUSD',
                                    ratePrecision: 5,
                                    pipsPosition: 4,
                                    base: 'GBP',
                                    terms: 'USD',
                                },
                            },
                        }),
                },
            }

            const output$ = currencyPairEpic(action$, state$, dependencies)
            expectObservable(output$).toBe('---c', {
                c: {
                    type: updateCurrencyPairs.type,
                    payload: {
                        EURUSD: {
                            symbol: 'EURUSD',
                            ratePrecision: 5,
                            pipsPosition: 4,
                            base: 'EUR',
                            terms: 'USD',
                        },
                        GBPUSD: {
                            symbol: 'GBPUSD',
                            ratePrecision: 5,
                            pipsPosition: 4,
                            base: 'GBP',
                            terms: 'USD',
                        },
                    },
                },
            })
        })
    })
})
