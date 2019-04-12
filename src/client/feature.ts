import KVStore from './kvStore';
import { TileData } from './esp/tile/model/tileData';
import moment from 'moment';
import { Store } from 'redux';
const {
  executionApiUrlUpdated,
  subscribePricingConnectionState,
  pricingApiUrlUpdated,
  unsubscribePricingConnectionState,
  updateSymbols
} = TileActions;
import { TradeBlotterAction } from './esp/blotter/actions';
const {
  subscribeTradeBlotterConnectionState,
  unsubscribeTradeBlotterConnectionState,
  subscribeTradeBlotterConnectionUrl
} = TradeBlotterAction;
import { TileActions } from './esp/tile/actions';
import { OrderAction } from './order/actions';
import { ConnectionStatus } from './layout/loader/model/serviceStatus';
import { history } from './configureStore';

export interface Feature {
  execute(store: Store): void;
}

export class FeatureContext {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  public execute(consul: string): void {
    consul
      ? new ConsulFeature().execute(this.store)
      : new DefaultFeature().execute(this.store);
  }
}

export class ConsulFeature implements Feature {
  public execute(store): void {
    let path = history.location.pathname;
    KVStore.start();
    let pricingUrl: string;
    let executionUrl: string;

    KVStore.addListener(values => {
      const precisions = new Map();
      const prices = new Map();
      values.forEach((v, k) => {
        if (k.startsWith('symbol')) {
          const s = k.split('/');
          s[2] === 'precision' && precisions.set(s[1], v);
          s[2] === 'price' && prices.set(s[1], v);
        }
      });
      let index = 0;
      let initialState: TileData[] = [];
      precisions.forEach((precision, symbol) => {
        initialState.push({
          id: ++index,
          tenor: 'SP',
          precision: parseInt(precision, 10),
          settlementDate: moment()
            .add(2, 'days')
            .format('L'),
          notional: 5000000,
          price: {
            id: 0,
            time: '',
            mid: 0,
            symbol: symbol,

            bids: [],
            asks: []
          },
          lastExecutionStatus: null,
          executing: false,
          pricingConnectionState: ConnectionStatus.DISCONNECTED
        });
      });

      store.dispatch(updateSymbols(initialState));
      store.dispatch(unsubscribePricingConnectionState());
      pricingUrl && store.dispatch(pricingApiUrlUpdated(pricingUrl));

      (path === '/Workspace' || path === '/') &&
        store.dispatch(subscribePricingConnectionState(pricingUrl));

      executionUrl && store.dispatch(executionApiUrlUpdated(executionUrl));

      if (values.has('service/url/SERVER')) {
        const url = values.get('service/url/SERVER');
        pricingUrl = url;
        store.dispatch(unsubscribePricingConnectionState());
        store.dispatch(pricingApiUrlUpdated(url));
        (path === '/Workspace' || path === '/') &&
          store.dispatch(subscribePricingConnectionState(url));
      }
      if (values.has('service/url/TRADESERVER')) {
        const url = values.get('service/url/TRADESERVER');
        executionUrl = url;
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
      }
    });
  }
}

export class DefaultFeature implements Feature {
  public execute(store): void {
    const tradeExecutionUrl = `${location.protocol}//${location.hostname}:8080`;
    const pricingUrl = `${location.protocol}//${location.hostname}:8085`;
    const ccyPairs = [
      { symbol: 'EURUSD', precision: 5 },
      { symbol: 'EURGBP', precision: 5 },
      { symbol: 'EURJPY', precision: 3 }
    ];

    const initialState: TileData[] = ccyPairs.map((ccyPair, index) => {
      return {
        id: ++index,
        tenor: 'SP',
        precision: ccyPair.precision,
        settlementDate: moment()
          .add(2, 'days')
          .format('L'),
        notional: 5000000,
        price: {
          id: 0,
          time: '',
          mid: 0,
          symbol: ccyPair.symbol,
          bids: [],
          asks: []
        },
        lastExecutionStatus: null,
        executing: false,
        pricingConnectionState: ConnectionStatus.DISCONNECTED
      };
    });
    store.dispatch(updateSymbols(initialState));
    store.dispatch(pricingApiUrlUpdated(pricingUrl));
    store.dispatch(executionApiUrlUpdated(tradeExecutionUrl));
    store.dispatch(subscribeTradeBlotterConnectionUrl(tradeExecutionUrl));
  }
}
