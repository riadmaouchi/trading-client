import { Observable } from 'rxjs';
import { filter, share, distinctUntilChanged, first } from 'rxjs/operators';
import { Order } from '../model/order';
import { LastTrade } from '../model/lastTrade';

export default class OrderbookService {
  private source: EventSource = new EventSource(
    'http://localhost:8080/v1/book/EURUSD'
  );

  getOrderStream = (): Observable<Order> => {
    const stream: Observable<Order> = Observable.create(obs => {
      this.source.addEventListener('orderLevelUpdated', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
      this.source.onerror = e => obs.error(e);
    });
    return stream.pipe(
      distinctUntilChanged(),
      filter(order => order.symbol === 'EURUSD'),
      share()
    );
  };

  getLastTradeStream = (): Observable<LastTrade> => {
    const stream: Observable<LastTrade> = Observable.create(obs => {
      this.source.addEventListener('lastTradeUpdated', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
      this.source.onerror = e => obs.error(e);
    });
    return stream.pipe(
      distinctUntilChanged(),
      filter(order => order.symbol === 'EURUSD'),
      share()
    );
  };

  getMarketPrice = (): Observable<LastTrade> => {
    return this.getLastTradeStream().pipe(first());
  };

  close = () => {
    this.source.close();
  };
}
