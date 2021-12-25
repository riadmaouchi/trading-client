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
        disconnect: () => {
            return {
                status: ConnectionStatus.SessionExpired,
                url: '',
            }
        },
        updateStatus: (_state, action) => action.payload,
    },
})

export const { connect, disconnect, updateStatus } =
    connectionStatusReducer.actions

export default connectionStatusReducer.reducer
