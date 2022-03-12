import { Price } from '@/services'

export interface TileData {
    id: string
    tenor: string
    settlementDate: string
    notional: number
    price: Price
    priceHistory: Price[]
    precision: number
    lastExecutionStatus?: LastExecutionStatus | null
    executing: boolean
}

export interface LastExecutionStatus {
    request: TradeRequest
    hasError: boolean
    error?: string
    trade: TradeReport
}

export interface TradeRequest {
    id: number
    price: number
    symbol: string
    broker: string
    side: string
    quantity: number
}

export interface TradeReport {
    tradeDate: string
    id: number
    symbol: string
    direction: Direction
    quantity: number
    price: number
    status: Status
    reason: string
}

export enum Direction {
    Buy = 'BUY',
    Sell = 'SELL',
}

export enum Status {
    Accepted = 'ACCEPTED',
    Rejected = 'REJECTED',
}
