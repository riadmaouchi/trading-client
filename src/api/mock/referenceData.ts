import { CurrencyPair } from '@/store/referenceData/pairs'

export const fakeReferenceData: Record<string, CurrencyPair> = {
    EURUSD: {
        symbol: 'EURUSD',
        ratePrecision: 5,
        pipsPosition: 4,
        base: 'EUR',
        terms: 'USD',
    },
    USDJPY: {
        symbol: 'USDJPY',
        ratePrecision: 3,
        pipsPosition: 2,
        base: 'USD',
        terms: 'JPY',
    },
    GBPUSD: {
        symbol: 'GBPUSD',
        ratePrecision: 5,
        pipsPosition: 4,
        base: 'GBP',
        terms: 'USD',
    },
    GBPJPY: {
        symbol: 'GBPJPY',
        ratePrecision: 3,
        pipsPosition: 2,
        base: 'GBP',
        terms: 'JPY',
    },
    EURJPY: {
        symbol: 'EURJPY',
        ratePrecision: 3,
        pipsPosition: 2,
        base: 'EUR',
        terms: 'JPY',
    },
    AUDUSD: {
        symbol: 'AUDUSD',
        ratePrecision: 5,
        pipsPosition: 4,
        base: 'AUD',
        terms: 'USD',
    },
    NZDUSD: {
        symbol: 'NZDUSD',
        ratePrecision: 5,
        pipsPosition: 4,
        base: 'NZD',
        terms: 'USD',
    },
    EURCAD: {
        symbol: 'EURCAD',
        ratePrecision: 5,
        pipsPosition: 4,
        base: 'EUR',
        terms: 'CAD',
    },
    EURAUD: {
        symbol: 'EURAUD',
        ratePrecision: 5,
        pipsPosition: 4,
        base: 'EUR',
        terms: 'AUD',
    },
}
