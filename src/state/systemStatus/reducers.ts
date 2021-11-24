import { createSlice } from '@reduxjs/toolkit'
import { ServiceGroup, ServiceStates } from '@/api'
import { disconnect } from '../connectionStatus/reducers'

export interface ServiceState {
    [key: string]: ServiceGroup
}

export const initialState: ServiceState = ['reference', 'pricing'].reduce(
    (acc: ServiceState, type: string) => {
        acc[type] = {
            type,
            state: ServiceStates.Connecting,
            count: 0,
        }
        return acc
    },
    {}
)

export const systemStatusReducer = createSlice({
    name: 'systemStatus',
    initialState,
    reducers: {
        updateServiceStatus: (state, action) => {
            return action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(disconnect, () => {
            return initialState
        })
    },
})

export const { updateServiceStatus } = systemStatusReducer.actions

export default systemStatusReducer.reducer
