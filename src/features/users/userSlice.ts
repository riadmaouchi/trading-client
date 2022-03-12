import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '@/services'
import { apiClient } from '../../services/apiClient'

export interface UserState {
    loading: boolean
    user?: User
}

const initialState: UserState = {
    loading: false,
}

export const login = createAsyncThunk('users/login', async (userId: string) => {
    return apiClient.login(userId)
})

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload as unknown as User
                state.loading = false
            })
            .addCase(login.rejected, (state) => {
                state.loading = false
            })
    },
})

export default userSlice.reducer
