import { Service, Services, ServiceTypes } from '@/services'
import { TestScheduler } from 'rxjs/testing'
import { connect, disconnect } from '../connection-status/connectionSlice'
import { systemStatusEpic } from './systemStatusEpics'
import { updateServiceStatus } from './systemStatusSlice'

jest.mock('../../services/client/connection')

const systemStatusData: Service[] = [
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

const services = new Services()
systemStatusData.forEach((status) => {
    const serviceType = new ServiceTypes(status.type)
    serviceType.update(status)
    services.add(status.type, serviceType)
})

const testScheduler = new TestScheduler((actual, expected) => {
    return expect(actual).toEqual(expected)
})
describe('Test SystemStatusEpic', () => {
    beforeEach(() => {
        testScheduler.frame = 0
    })

    test('Updates system status', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', {
                a: connect(),
                b: disconnect(),
                c: updateServiceStatus({
                    reference: {
                        type: 'reference',
                        status: 'CONNECTED',
                        count: 1,
                    },
                    pricing: { type: 'pricing', state: 'CONNECTED', count: 1 },
                }),
            })
            const state$ = {}

            const dependencies = {
                api: {
                    subscribeSystemStatus: () =>
                        cold('--c', {
                            c: services,
                        }),
                },
            }

            const output$ = systemStatusEpic(action$, state$, dependencies)
            expectObservable(output$).toBe('---c', {
                c: {
                    type: updateServiceStatus.type,
                    payload: {
                        pricing: {
                            count: 1,
                            state: 'CONNECTED',
                            type: 'pricing',
                        },
                        reference: {
                            count: 1,
                            state: 'CONNECTED',
                            type: 'reference',
                        },
                    },
                },
            })
        })
    })
})
