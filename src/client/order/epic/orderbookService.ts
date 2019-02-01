import * as EventSource from 'eventsource';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  first,
  share,
  shareReplay
} from 'rxjs/operators';
import { ConnectionStatus } from '../../layout/loader/model/serviceStatus';
import { LastTrade } from '../model/lastTrade';
import { Order } from '../model/order';

export default class OrderbookService {
  private source: EventSource;
  private orders: Observable<Order>;
  private lastTrades: Observable<LastTrade>;
  private indicators: Observable<LastTrade>;
  private connections: Observable<ConnectionStatus>;

  constructor() {
    this.source = new EventSource(
      `${process.env.TRADE_EXECUTION_API_URL}/book/EURUSD`
    );
    this.connections = Observable.create(obs => {
      this.source.onopen = e =>
        obs.next(this.connectionState(this.source.readyState));

      this.source.onerror = e =>
        obs.next(this.connectionState(this.source.readyState));
    }).pipe(
      distinctUntilChanged(),
      shareReplay()
    );
    this.connections.subscribe();
    this.orders = Observable.create(obs => {
      this.source.addEventListener('orderLevelUpdated', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
    }).pipe(
      distinctUntilChanged(),
      share()
    );

    this.lastTrades = Observable.create(obs => {
      this.source.addEventListener('lastTradeUpdated', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
    }).pipe(
      distinctUntilChanged(),
      share()
    );

    this.indicators = Observable.create(obs => {
      this.source.addEventListener('indicatorsUpdated', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
    }).pipe(
      distinctUntilChanged((p: LastTrade, q: LastTrade) => p.time === q.time),
      share()
    );
  }

  connectionState(state: number): ConnectionStatus {
    switch (state) {
      case EventSource.CONNECTING:
        return ConnectionStatus.CONNECTING;
      case EventSource.OPEN:
        return ConnectionStatus.CONNECTED;
      default:
        return ConnectionStatus.DISCONNECTED;
    }
  }

  getOrderStream = (): Observable<Order> =>
    this.orders.pipe(filter(order => order.symbol === 'EURUSD'));

  getLastTradeStream = (): Observable<LastTrade> =>
    this.lastTrades.pipe(filter(order => order.symbol === 'EURUSD'));

  getIndicatorsStream = (): Observable<LastTrade> => {
    return this.indicators.pipe(filter(order => order.symbol === 'EURUSD'));
  };

  getMarketPrice = (): Observable<LastTrade> =>
    this.getLastTradeStream().pipe(first());

  getConnectionStream = (): Observable<ConnectionStatus> => this.connections;

  close = () => this.source.close();
}
