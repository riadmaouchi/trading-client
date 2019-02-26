import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
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
import TradeBlotterService from './esp/blotter/epic/tradeBlotterService';
import OrderbookService from './order/epic/orderbookService';
import OrderBlotterService from './order/components/blotter/epic/orderBlotterService';
import OrderService from './order/epic/orderService';

import { FeatureContext } from './feature';

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

new FeatureContext(store).execute(process.env.CONSUL);

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}
