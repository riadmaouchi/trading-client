import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { createEpicMiddleware, Epic } from 'redux-observable'
import { disconnectAfterAWhile } from './middleware'

import tileDataReducer from '@/store/pricing/reducers'
import connectionStatusReducer from '@/store/connectionStatus/reducers'
import systemStatusReducer from '@/store/systemStatus/reducers'
import referenceDataReducer from '@/store/referenceData/reducers'
import userSlice from '@/slices/userSlice'
import { API } from '@/api'

const reducer = combineReducers({
    tiles: tileDataReducer,
    connectionStatus: connectionStatusReducer,
    systemStatus: systemStatusReducer,
    referenceData: referenceDataReducer,
    user: userSlice,
})

export type RootState = ReturnType<typeof reducer>

export type RootEpic = Epic<AnyAction, AnyAction, RootState>

export const epicMiddleware = createEpicMiddleware<
    AnyAction,
    AnyAction,
    RootState
>({
    dependencies: { api: API },
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(epicMiddleware, disconnectAfterAWhile),
})
