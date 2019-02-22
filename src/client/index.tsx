import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import KVStore from './kvStore';
import 'bootstrap';
import '../../public/assets/styles/custom.scss';
import { MainRouter } from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGlobe,
  faStream,
  faPowerOff,
  faUser,
  faCalendarAlt,
  faTable,
  faExchangeAlt,
  faArrowDown,
  faArrowUp,
  faCircle,
  faExclamationCircle,
  faSpinner,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { createApplicationServices } from './applicationServices';
import PricingService from './esp/tile/epic/pricingService';
import ExecutionService from './esp/tile/epic/executionService';
const {
  executionApiUrlUpdated,
  subscribePricingConnectionState,
  pricingApiUrlUpdated,
  unsubscribePricingConnectionState
} = TileActions;
import { TileActions } from './esp/tile/actions';
import TradeBlotterService from './esp/blotter/epic/tradeBlotterService';
import { TradeBlotterAction } from './esp/blotter/actions';
import { history } from './configureStore';
import OrderbookService from './order/epic/orderbookService';
import { OrderAction } from './order/actions';
import OrderBlotterService from './order/components/blotter/epic/orderBlotterService';
import OrderService from './order/epic/orderService';
const {
  subscribeTradeBlotterConnectionState,
  unsubscribeTradeBlotterConnectionState,
  subscribeTradeBlotterConnectionUrl
} = TradeBlotterAction;

library.add(
  faGlobe,
  faStream,
  faPowerOff,
  faUser,
  faCalendarAlt,
  faTable,
  faExchangeAlt,
  faArrowDown,
  faArrowUp,
  faCircle,
  faExclamationCircle,
  faSpinner,
  faCheckCircle,
  faTimesCircle
);

let path = history.location.pathname;

const local = (): void => {
  const tradeExecutionUrl = `${location.protocol}//${location.hostname}:8080`;
  const pricingUrl = `${location.protocol}//${location.hostname}:8085`;
  store.dispatch(pricingApiUrlUpdated(pricingUrl));
  store.dispatch(executionApiUrlUpdated(tradeExecutionUrl));
  store.dispatch(subscribeTradeBlotterConnectionUrl(tradeExecutionUrl));
};

const pricingService = new PricingService();
const tradeBlotterService = new TradeBlotterService();
const orderbookService = new OrderbookService();
const orderBlotterService = new OrderBlotterService();

const store = configureStore(
  createApplicationServices({
    pricingService,
    executionService: new ExecutionService(),
    tradeBlotterService,
    orderbookService,
    orderBlotterService,
    orderService: new OrderService()
  })
);

const consul = (): void => {
  KVStore.start();
  KVStore.addListener('service/url/server', url => {
    store.dispatch(unsubscribePricingConnectionState());
    store.dispatch(pricingApiUrlUpdated(url));
    (path === '/Workspace' || path === '/') &&
      store.dispatch(subscribePricingConnectionState(url));
  });

  KVStore.addListener('service/url/tradeserver', url => {
    store.dispatch(executionApiUrlUpdated(url));
    store.dispatch(subscribeTradeBlotterConnectionUrl(url));
    store.dispatch(unsubscribeTradeBlotterConnectionState());
    store.dispatch(OrderAction.unsubscribeOrderbookConnectionState());
    switch (path) {
      case '/':
      case '/Workspace':
        store.dispatch(subscribeTradeBlotterConnectionState(url));
        break;
      case '/Order':
        store.dispatch(OrderAction.executionApiUrlUpdated(url));
        store.dispatch(OrderAction.subscribeOrderbookConnectionState(url));
        break;
      case '/Blotter':
        store.dispatch(subscribeTradeBlotterConnectionState(url));
        break;
    }
  });
};

process.env.CONSUL ? consul() : local();

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}
