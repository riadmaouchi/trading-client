import { Observable } from 'rxjs';
import { PriceLadder } from '../model';
import { share } from 'rxjs/operators';
import { ConnectionStatus } from '../../../layout/loader/model/serviceStatus';

export default class PricingService {
  private source: EventSource;

  connect = (url: string) => {
    this.source = new EventSource(`${url}/v1/pricing`);
  };

  getPriceStream = (): Observable<PriceLadder> => {
    return new Observable<PriceLadder>(obs => {
      this.source.addEventListener('price', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
    }).pipe(share());
  };

  getConnectionStream = (): Observable<ConnectionStatus> => {
    return new Observable<ConnectionStatus>(obs => {
      this.source.onopen = e => obs.next(ConnectionStatus.CONNECTED);

      this.source.onerror = e => obs.next(ConnectionStatus.DISCONNECTED);
      return () => this.source.close();
    }).pipe(share());
  };
}
