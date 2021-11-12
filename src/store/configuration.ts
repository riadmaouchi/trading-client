import { Action, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import { sessionEpic } from '@/api'

import rootReducer from './reducers'
import { ApplicationDependencies, GlobalState } from '.'

export const configureStore = (dependencies: ApplicationDependencies) => {
    const epics = [sessionEpic]

    const middleware = createEpicMiddleware<Action, Action, GlobalState>({
        dependencies,
    })

    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(middleware))
    )

    middleware.run(combineEpics(...epics))

    return store
}
