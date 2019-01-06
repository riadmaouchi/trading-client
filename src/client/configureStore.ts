import { Action, createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import rootReducer, { RootState } from './combineReducers';
import { pricingServiceEpic } from './esp/tile/epic/pricingEpic';
import { executionEpic } from './esp/tile/epic/executionEpic';
import { tradeBlotterEpic } from './esp/blotter/epic/tradeBlotterEpic';
import { orderBlotterEpic } from './order/components/blotter/epic/orderBlotterEpic';
import {
  orderbookServiceEpic,
  onTradeExecuted,
  onMarketPrice
} from './order/epic/orderbookServiceEpic';
import { orderEpic } from './order/epic/orderEpic';
import { GlobalState } from './StoreType';

export function configureStore(initialState?: RootState): Store<RootState> {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  const middleware = createEpicMiddleware<Action, Action, GlobalState>();

  const createStoreWithMiddleware = applyMiddleware(logger, middleware)(create);

  const store = createStoreWithMiddleware(rootReducer, initialState) as Store<
    RootState
  >;

  const epics = [
    pricingServiceEpic,
    executionEpic,
    tradeBlotterEpic,
    orderBlotterEpic,
    orderbookServiceEpic,
    onTradeExecuted,
    onMarketPrice,
    orderEpic
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
    //console.log(action);
    return next(action);
  };
}
