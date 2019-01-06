import { Action } from 'redux';
import { Epic } from 'redux-observable';
import rootReducer from './combineReducers';

export type GlobalState = ReturnType<typeof rootReducer>;
export type ApplicationEpic<T extends Action = Action> = Epic<
  T,
  T,
  GlobalState
>;
