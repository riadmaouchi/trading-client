import { disconnect } from '../connectionStatus/reducers'
import { createSlice } from '@reduxjs/toolkit'
import { TileData } from './tile'
import { format } from 'date-fns'
import addDays from 'date-fns/addDays'

export type TileState = Record<string, TileData | undefined>

const priceHistorySize = 200

const INITIAL_STATE: TileState = {}

const INITIAL_TILE_STATE: TileData = {
    id: '',
    tenor: 'SP',
    precision: 5,
    settlementDate: format(addDays(new Date(), 2), 'dd MMM'),
    notional: 1000000,
    price: {
        id: 0,
        time: 0,
        mid: 0,
        high: 0,
        low: 0,
        symbol: '',
        bids: [],
        asks: [],
    },
    priceHistory: [],
    lastExecutionStatus: null,
    executing: false,
}

export const tileDataReducer = createSlice({
    name: 'tileData',
    initialState: INITIAL_STATE,
    reducers: {
        subscribe: (state, action) => {
            return {
                ...state,
                [action.payload]: {
                    ...INITIAL_TILE_STATE,
                    symbol: action.payload,
                },
            }
        },
        unsubscribe: (state, action) => {
            return {
                ...state,
                [action.payload]: { ...INITIAL_TILE_STATE },
            }
        },
        updateNotional: (state, action) => {
            return {
                ...state,
                [action.payload.symbol]: {
                    ...state,
                    [action.payload.symbol]: {
                        ...state,
                        notional: action.payload.notional,
                    },
                },
            }
        },
        updatePrice: (state, action) => {
            return {
                ...state,
                [action.payload.symbol]: update(
                    state[action.payload.symbol],
                    action.payload
                ),
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(disconnect, () => INITIAL_STATE)
    },
})

const update = (state, tile: TileData) => {
    if (state.priceHistory.length >= priceHistorySize) {
        return {
            ...state,
            price: tile,
            priceHistory: [
                ...state.priceHistory.slice(1, state.priceHistory.length),
                tile,
            ],
        }
    }

    return {
        ...state,
        price: tile,
        priceHistory: [...state.priceHistory.slice(), tile],
    }
}

export const { subscribe, unsubscribe, updateNotional, updatePrice } =
    tileDataReducer.actions

export default tileDataReducer.reducer