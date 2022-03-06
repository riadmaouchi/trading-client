import { referenceDataEpic } from './epics'
import { updateReferenceData } from './reducers'
import { TestScheduler } from 'rxjs/testing'
import { connect, disconnect } from '../connectionStatus/reducers'

jest.mock('../../lib/transport')

const testScheduler = new TestScheduler((actual, expected) => {
    return expect(actual).toEqual(expected)
})
describe('Test ReferenceDataEpic', () => {
    beforeEach(() => {
        testScheduler.frame = 0
    })

    test('Updates reference data', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', {
                a: connect(),
                b: disconnect(),
                c: updateReferenceData({
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
                    subscribeReferenceData: () =>
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

            const output$ = referenceDataEpic(action$, state$, dependencies)
            expectObservable(output$).toBe('---c', {
                c: {
                    type: updateReferenceData.type,
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
