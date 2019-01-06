import { Observable } from 'rxjs';
import { PriceLadder } from '../model';
import { share } from 'rxjs/operators';

export default class PricingService {
  private source: EventSource = new EventSource(
    'http://localhost:8085/v1/pricing'
  );

  getPriceStream = (): Observable<PriceLadder> => {
    const stream: Observable<PriceLadder> = Observable.create(obs => {
      this.source.addEventListener('price', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
      this.source.onerror = e => obs.error(e);
    });
    return stream.pipe(share());
  };

  close = () => this.source.close();
}
