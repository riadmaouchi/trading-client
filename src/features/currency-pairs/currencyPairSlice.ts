import { createSlice } from '@reduxjs/toolkit'
import { CurrencyPair } from '@/services'
import { disconnect } from '../connection-status/connectionSlice'

export interface CurrencyPairState {
    [id: string]: CurrencyPair
}

export interface currencyPairsState {
    pairs?: CurrencyPairState
}

const initialState: currencyPairsState = {}

export const instrumentSlice = createSlice({
    name: 'currencyPairsSlice',
    initialState,
    reducers: {
        updateInstrument: (state, action) => {
            return { ...state, pairs: action.payload }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(disconnect, () => {
            return initialState
        })
    },
})

export const { updateInstrument: updateCurrencyPairs } = instrumentSlice.actions

export default instrumentSlice.reducer
