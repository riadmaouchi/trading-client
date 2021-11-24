import { createSlice } from '@reduxjs/toolkit'
import { User } from '@/api'

export interface UserState {
    selectingUser: boolean
    user?: User
}

const initialState: UserState = {
    selectingUser: false,
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSelected: (state, action) => {
            return { selectingUser: false, user: action.payload }
        },
        userSelect: (state) => {
            return { ...state, selectingUser: true }
        },
        userNotSelected: (state) => {
            return { ...state, selectingUser: false }
        },
        userRemoved: () => {
            return initialState
        },
    },
})

export const { userSelected, userSelect, userNotSelected, userRemoved } =
    userReducer.actions

export default userReducer.reducer
