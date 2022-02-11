import { referenceDataEpic } from './epics'
import { updateReferenceData } from './reducers'
import { TestScheduler } from 'rxjs/testing'
import { connect, disconnect } from '../connectionStatus/reducers'
import { Service, Services, ServiceTypes } from '@/api'
import { subscribe } from '@/state/pricing/reducers'

jest.mock('../../lib/transport')
jest.mock('../../api/api')

const referenceData: Service[] = [
    {
        type: 'reference',
        id: '1',
        timestamp: 1,
        isConnected: true,
    },
    {
        type: 'pricing',
        id: '1',
        timestamp: 1,
        isConnected: true,
    },
]

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
