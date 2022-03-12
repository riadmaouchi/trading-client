import { Connection, ConnectionStatus } from '@/services/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: Connection = {
    status: ConnectionStatus.Disconnected,
    url: '',
}

export const connectionSlice = createSlice({
    name: 'connectionSlice',
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

export const { connect, disconnect, updateStatus } = connectionSlice.actions

export default connectionSlice.reducer
