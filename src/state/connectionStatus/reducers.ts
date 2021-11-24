import { Connection, ConnectionStatus } from '@/api/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: Connection = {
    status: ConnectionStatus.Disconnected,
    url: '',
}

export const connectionStatusReducer = createSlice({
    name: 'connectionStatus',
    initialState,
    reducers: {
        connect: (state) => state,
        disconnect: (state) => {
            state = {
                status: ConnectionStatus.SessionExpired,
                url: '',
            }
            return state
        },
        updateStatus: (state, action) => {
            console.log(action.payload)
            state = action.payload
            return state
        },
    },
})

export const { connect, disconnect, updateStatus } =
    connectionStatusReducer.actions

export default connectionStatusReducer.reducer
