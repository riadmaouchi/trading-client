import { configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { disconnectAfterAWhile } from './middleware'

import tileDataReducer from '@/state/pricing/reducers'
import connectionStatusReducer from '@/state/connectionStatus/reducers'
import systemStatusReducer from '@/state/systemStatus/reducers'
import referenceDataReducer from '../state/referenceData/reducers'
import userReducer from '@/state/user/reducers'

import { connectionStatusEpic } from '@/state/connectionStatus'
import { systemStatusEpic } from '@/state/systemStatus'
import { referenceDataEpic } from '@/state/referenceData/epics'
import { pricingServiceEpic } from '@/state/pricing/epics'

export const epicMiddleware = createEpicMiddleware()

export const rootEpic = combineEpics(
    connectionStatusEpic,
    systemStatusEpic,
    referenceDataEpic,
    pricingServiceEpic
)

export const store = configureStore({
    reducer: {
        tiles: tileDataReducer,
        connectionStatus: connectionStatusReducer,
        systemStatus: systemStatusReducer,
        referenceData: referenceDataReducer,
        user: userReducer,
    },
    middleware: [epicMiddleware, disconnectAfterAWhile],
})

export type RootState = ReturnType<typeof store.getState>
