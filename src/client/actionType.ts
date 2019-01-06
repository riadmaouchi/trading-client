import { ActionCreatorsMapObject } from 'redux';
import rootReducer from './combineReducers';
import { Action } from 'redux';
import { Epic } from 'redux-observable';

export type ActionUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;

export type ApplicationEpic<T extends Action = Action> = Epic<
  T,
  T,
  GlobalState
>;

export type GlobalState = ReturnType<typeof rootReducer>;
