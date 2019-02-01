import { Observable } from 'rxjs';
import { OrderUpdate } from '../../../model/orderUpdate';
import {
  share,
  distinctUntilChanged,
  bufferTime,
  filter
} from 'rxjs/operators';

export default class PricingService {
  private source: EventSource = new EventSource(
    `${process.env.TRADE_EXECUTION_API_URL}/order/blotter`
  );

  getOrderUpdateStream = (): Observable<OrderUpdate[]> => {
    const stream: Observable<OrderUpdate> = Observable.create(obs => {
      this.source.addEventListener('orderEvent', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
      // this.source.onerror = e => obs.error(e);
    });
    return stream.pipe(
      distinctUntilChanged(),
      bufferTime(1000),
      filter(buffer => buffer.length > 0),
      share()
    );
  };

  close = () => this.source.close();
}
