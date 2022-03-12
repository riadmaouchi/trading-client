import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware, Epic } from 'redux-observable'
import { disconnectAfterAWhile } from './middleware'

import tileDataSlice from '@/features/rates/tile/tileSlice'
import connectionSlice from '@/features/connection-status/connectionSlice'
import systemStatusSlice from '@/features/system-status/systemStatusSlice'
import currencyPairSlice from '@/features/currency-pairs/currencyPairSlice'
import userSlice from '@/features/users/userSlice'
import { apiClient } from '@/services'

const reducer = combineReducers({
    tiles: tileDataSlice,
    connectionStatus: connectionSlice,
    systemStatus: systemStatusSlice,
    currencyPairs: currencyPairSlice,
    user: userSlice,
})

export type RootState = ReturnType<typeof reducer>

export type RootEpic = Epic<AnyAction, AnyAction, RootState>

export const epicMiddleware = createEpicMiddleware<
    AnyAction,
    AnyAction,
    RootState
>({
    dependencies: { api: apiClient },
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(epicMiddleware, disconnectAfterAWhile),
})