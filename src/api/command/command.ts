export interface CurrencyPairMsg {
    symbol: string
    ratePrecision: number
    pipsPosition: number
    base: string
    terms: string
}

export enum UpdateTypes {
    Added = 'Added',
    Removed = 'Removed',
}

export interface CurrencyPairUpdateMsg {
    updateType: UpdateTypes
    currencyPair: CurrencyPairMsg
}

export interface CurrencyPairUpdatesMsg {
    isStale: boolean
    currencyPairs: CurrencyPairUpdateMsg[]
}

export interface ServiceStateMsg {
    type: string
    id: string
    timestamp: number
}
