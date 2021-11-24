import { createSlice } from '@reduxjs/toolkit'
import { CurrencyPair } from './pairs'
import { disconnect } from '../connectionStatus/reducers'

export interface CurrencyPairState {
    [id: string]: CurrencyPair
}

export interface ReferenceDataState {
    pairs?: CurrencyPairState
}

const initialState: ReferenceDataState = {}

export const referenceDataReducer = createSlice({
    name: 'referenceData',
    initialState,
    reducers: {
        updateReferenceData: (state, action) => {
            return { ...state, pairs: action.payload }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(disconnect, () => {
            return initialState
        })
    },
})

export const { updateReferenceData } = referenceDataReducer.actions

export default referenceDataReducer.reducer
