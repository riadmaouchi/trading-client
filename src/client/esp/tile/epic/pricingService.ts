import { Observable, timer, merge } from 'rxjs';
import { PriceLadder } from '../model';
import { share, mapTo, switchMap, filter } from 'rxjs/operators';
import { ConnectionStatus } from '../../../layout/loader/model/serviceStatus';

export default class PricingService {
  private source: EventSource;

  connect = (url: string) => {
    this.source = new EventSource(`${url}/v1/pricing`);
  };

  getPriceStream = (symbol: string): Observable<PriceLadder> => {
    return new Observable<PriceLadder>(obs => {
      this.source.addEventListener('price', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
    }).pipe(
      filter(ladder => ladder.symbol === symbol),
      this.debounce<PriceLadder>(5000, item => {
        return {
          ...item,
          priceStale: true
        };
      }),
      share()
    );
  };

  getConnectionStream = (): Observable<ConnectionStatus> => {
    return new Observable<ConnectionStatus>(obs => {
      this.source.onopen = e => obs.next(ConnectionStatus.CONNECTED);

      this.source.onerror = e => obs.next(ConnectionStatus.DISCONNECTED);
      return () => this.source.close();
    }).pipe(share());
  };

  debounce = <T>(
    time: number,
    value: (lastValue: T) => T
  ): ((source: Observable<T>) => Observable<T>) => source => {
    const timeout = source.pipe(
      switchMap(last => timer(time).pipe(mapTo(value(last))))
    );
    return merge(source, timeout);
  };
}
