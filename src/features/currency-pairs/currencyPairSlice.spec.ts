import { store } from '@/app/store'
import { updateCurrencyPairs } from './currencyPairSlice'

jest.mock('../../api/transport')

test('Updates Currency Pairs', () => {
    let state = store.getState().currencyPairs

    expect(state).toStrictEqual({})

    store.dispatch(
        updateCurrencyPairs({
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
    state = store.getState().currencyPairs
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
