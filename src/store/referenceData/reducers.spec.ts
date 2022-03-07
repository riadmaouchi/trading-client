import { store } from '../store'
import { updateReferenceData } from './reducers'

jest.mock('../../api/transport')

test('Updates reference data', () => {
    let state = store.getState().referenceData

    expect(state).toStrictEqual({})

    store.dispatch(
        updateReferenceData({
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
        })
    )
    state = store.getState().referenceData
    expect(state).toStrictEqual({
        pairs: {
            EURUSD: {
                base: 'EUR',
                pipsPosition: 4,
                ratePrecision: 5,
                symbol: 'EURUSD',
                terms: 'USD',
            },
            GBPUSD: {
                base: 'GBP',
                pipsPosition: 4,
                ratePrecision: 5,
                symbol: 'GBPUSD',
                terms: 'USD',
            },
        },
    })
})
