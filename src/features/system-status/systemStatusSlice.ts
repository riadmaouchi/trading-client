import { ServiceGroup, ServiceStates } from '@/services'
import { createSlice } from '@reduxjs/toolkit'
import { disconnect } from '../connection-status/connectionSlice'

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

export const systemStatusSlice = createSlice({
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

export const { updateServiceStatus } = systemStatusSlice.actions

export default systemStatusSlice.reducer
