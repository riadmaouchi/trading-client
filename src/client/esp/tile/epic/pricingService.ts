import { Observable } from 'rxjs';
import { PriceLadder } from '../model';
import { share, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { ConnectionStatus } from '../../../layout/loader/model/serviceStatus';
import { CONNECTING, OPEN } from 'eventsource';

export default class PricingService {
  private connections: Observable<ConnectionStatus>;
  private source: EventSource;
  private prices: Observable<PriceLadder>;

  constructor() {
    this.source = new EventSource('http://localhost:8085/v1/pricing');

    this.connections = Observable.create(obs => {
      this.source.onopen = e =>
        obs.next(this.connectionState(this.source.readyState));

      this.source.onerror = e =>
        obs.next(this.connectionState(this.source.readyState));
    }).pipe(
      distinctUntilChanged(),
      shareReplay()
    );
    //        this.connections.subscribe();

    this.prices = Observable.create(obs => {
      this.source.addEventListener('price', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
      // this.source.onerror = e => obs.error(e);
    }).pipe(share());
  }

  connectionState(state: number): ConnectionStatus {
    switch (state) {
      case CONNECTING:
        return ConnectionStatus.CONNECTING;
      case OPEN:
        return ConnectionStatus.CONNECTED;
      default:
        return ConnectionStatus.DISCONNECTED;
    }
  }

  getPriceStream = (): Observable<PriceLadder> => this.prices;

  getConnectionStream = (): Observable<ConnectionStatus> => this.connections;

  close = () => this.source.close();
}
