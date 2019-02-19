import * as EventSource from 'eventsource';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, take, share } from 'rxjs/operators';
import { ConnectionStatus } from '../../layout/loader/model/serviceStatus';
import { LastTrade } from '../model/lastTrade';
import { Order } from '../model/order';

export default class OrderbookService {
  private source: EventSource;

  connect = (url: string) => {
    this.source = new EventSource(`${url}/v1/book/EURUSD`);
  };

  getOrderStream = (): Observable<Order> => {
    return new Observable<Order>(obs => {
      this.source.addEventListener('orderLevelUpdated', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
    }).pipe(
      filter(order => order.symbol === 'EURUSD'),
      distinctUntilChanged(),
      share()
    );
  };

  getLastTradeStream = (): Observable<LastTrade> => {
    return new Observable<LastTrade>(obs => {
      this.source.addEventListener('lastTradeUpdated', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
    }).pipe(
      filter(order => order.symbol === 'EURUSD'),
      distinctUntilChanged(),
      share()
    );
  };

  getIndicatorsStream = (): Observable<LastTrade> => {
    return new Observable<LastTrade>(obs => {
      this.source.addEventListener('indicatorsUpdated', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
    }).pipe(
      filter(order => order.symbol === 'EURUSD'),
      distinctUntilChanged((p: LastTrade, q: LastTrade) => p.time === q.time),
      share()
    );
  };

  getMarketPrice = (): Observable<LastTrade> =>
    this.getLastTradeStream().pipe(take(1));

  getConnectionStream = (): Observable<ConnectionStatus> => {
    return Observable.create(obs => {
      this.source.onopen = e => obs.next(ConnectionStatus.CONNECTED);

      this.source.onerror = e => obs.next(ConnectionStatus.DISCONNECTED);
      return () => this.source.close();
    }).pipe(
      distinctUntilChanged(),
      share()
    );
  };
}
