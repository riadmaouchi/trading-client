import { connectionStatusEpic } from './connectionEpics'
import { connect, disconnect, updateStatus } from './connectionSlice'
import { TestScheduler } from 'rxjs/testing'

jest.mock('../../api/transport')

const testScheduler = new TestScheduler((actual, expected) => {
    return expect(actual).toEqual(expected)
})
describe('Test ConnectionStatusEpic', () => {
    beforeEach(() => {
        testScheduler.frame = 0
    })

    test('Updates connection status', () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', {
                a: connect(),
                b: disconnect(),
            })
            const state$ = {}

            const dependencies = {
                api: {
                    subcribeConnectionStatus: () =>
                        cold('--a--b---a', {
                            a: {
                                status: 'connected',
                                url: 'http://localhost:8080',
                            },
                            b: {
                                status: 'disconnected',
                                url: '',
                            },
                        }),
                },
            }

            const output$ = connectionStatusEpic(action$, state$, dependencies)
            expectObservable(output$).toBe('---a--b---a', {
                a: {
                    type: updateStatus.type,
                    payload: {
                        status: 'connected',
                        url: 'http://localhost:8080',
                    },
                },
                b: {
                    type: updateStatus.type,
                    payload: {
                        status: 'disconnected',
                        url: '',
                    },
                },
            })
        })
    })
})
