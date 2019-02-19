import { Observable } from 'rxjs';
import { OrderUpdate } from '../../../model/orderUpdate';
import {
  share,
  distinctUntilChanged,
  bufferTime,
  filter
} from 'rxjs/operators';

export default class OrderBlotterService {
  private source: EventSource;

  connect = (url: string) => {
    this.source = new EventSource(`${url}/v1/order/blotter`);
  };

  getOrderUpdateStream = (): Observable<OrderUpdate[]> => {
    return new Observable<OrderUpdate>(obs => {
      this.source.addEventListener('orderEvent', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
      return () => this.source.close();
    }).pipe(
      distinctUntilChanged(),
      bufferTime(1000),
      filter(buffer => buffer.length > 0),
      share()
    );
  };
}
