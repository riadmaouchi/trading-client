import { Observable, timer, merge } from 'rxjs';
import { PriceLadder } from '../model';
import { share, mapTo, switchMap, filter, scan } from 'rxjs/operators';
import { ConnectionStatus } from '../../../layout/loader/model/serviceStatus';
import { Movements, Price } from '../model/priceTick';

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
      scan<PriceLadder>((acc, next) => {
        next.asks.some((price, index) => {
          if (index > acc.asks.length) return true;
          price.mouvement = this.computeMovement(acc.asks[index], price);
          return false;
        });

        next.bids.some((price, index) => {
          if (index > acc.bids.length) return true;
          price.mouvement = this.computeMovement(acc.bids[index], price);
          return false;
        });

        return next;
      }),
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

  computeMovement(prevPrice: Price, nexPrice: Price) {
    const prevPriceMove = prevPrice.mouvement || Movements.None;
    const lastPrice = prevPrice.price;
    const nextPrice = nexPrice.price;
    if (lastPrice < nextPrice) {
      return Movements.Up;
    }
    if (lastPrice > nextPrice) {
      return Movements.Down;
    }
    return prevPriceMove;
  }
}
