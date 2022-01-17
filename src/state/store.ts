import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware, Epic } from 'redux-observable'
import { disconnectAfterAWhile } from './middleware'

import tileDataReducer from '@/state/pricing/reducers'
import connectionStatusReducer from '@/state/connectionStatus/reducers'
import systemStatusReducer from '@/state/systemStatus/reducers'
import referenceDataReducer from '@/state/referenceData/reducers'
import userReducer from '@/state/user/reducers'
import { API } from '@/api'

const reducer = combineReducers({
    tiles: tileDataReducer,
    connectionStatus: connectionStatusReducer,
    systemStatus: systemStatusReducer,
    referenceData: referenceDataReducer,
    user: userReducer,
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
    middleware: [epicMiddleware, disconnectAfterAWhile],
})
