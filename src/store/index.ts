import { Epic } from 'redux-observable'
import { Action, ActionCreatorsMapObject } from 'redux'

import * as actionType from './actions'
import rootReducer from './reducers'
import { createApplicationServices } from './application'

export const { action } = actionType
export type ActionUnion<A extends ActionCreatorsMapObject> =
    actionType.ActionUnion<A>

export type GlobalState = ReturnType<typeof rootReducer>
export type ApplicationEpic<
    R extends Partial<ApplicationDependencies> = ApplicationDependencies,
    T extends Action = Action
> = Epic<T, T, GlobalState, R>

export type ApplicationDependencies = ReturnType<
    typeof createApplicationServices
>
