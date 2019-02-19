import { Action, applyMiddleware, Store, createStore } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router';
import rootReducer, { RootState } from './combineReducers';
import {
  pricingServiceEpic,
  pricingConnectionStatusUpdated
} from './esp/tile/epic/pricingEpic';
import {
  tradeBlotterEpic,
  tradeBlotterConnectionStatusUpdated
} from './esp/blotter/epic/tradeBlotterEpic';
import { orderBlotterEpic } from './order/components/blotter/epic/orderBlotterEpic';
import {
  orderbookServiceEpic,
  onTradeExecuted,
  onIndicatorsUpdated,
  onMarketPrice,
  orderbookConnectionStatusUpdated
} from './order/epic/orderbookServiceEpic';
import { orderPlacedEpic } from './order/epic/orderEpic';
import { espExecutionEpic } from './esp/tile/epic/executionEpic';
import { GlobalState } from './StoreType';
import createBrowserHistory from 'history/createBrowserHistory';
import { ApplicationDependencies } from './applicationServices';

export const history = createBrowserHistory();

export default function configureStore(
  dependencies: ApplicationDependencies,
  initialState?: RootState
): Store<RootState> {
  const create = window.window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()(createStore)
    : createStore;

  const middleware = createEpicMiddleware<Action, Action, GlobalState>({
    dependencies
  });

  const createStoreWithMiddleware = applyMiddleware(
    logger,
    middleware,
    routerMiddleware(history)
  )(create);

  const store = createStoreWithMiddleware(
    rootReducer(history),
    initialState
  ) as Store<RootState>;

  const epics = [
    pricingServiceEpic,
    espExecutionEpic,
    tradeBlotterEpic,
    orderBlotterEpic,
    orderbookServiceEpic,
    onTradeExecuted,
    onIndicatorsUpdated,
    onMarketPrice,
    orderPlacedEpic,
    orderbookConnectionStatusUpdated,
    pricingConnectionStatusUpdated,
    tradeBlotterConnectionStatusUpdated
  ];

  if (module.hot) {
    module.hot.accept('.', () => {
      const nextReducer = require('.');
      store.replaceReducer(nextReducer);
    });
  }
  middleware.run(combineEpics(...epics));

  return store;
}

function logger(store: any) {
  return (next: any) => <A extends Action>(action: A) => {
    //  console.log(action);
    return next(action);
  };
}
