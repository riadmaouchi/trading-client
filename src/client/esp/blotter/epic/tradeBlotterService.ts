import { Observable } from 'rxjs';
import { TradeReport } from '../../tile/model/tradeReport';
import { share } from 'rxjs/operators';

export default class PricingService {
  private source: EventSource = new EventSource(
    'http://localhost:8080/v1/execution'
  );

  getTradeReportStream = (): Observable<TradeReport> => {
    const stream: Observable<TradeReport> = Observable.create(obs => {
      this.source.addEventListener('tradeReport', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
      this.source.onerror = e => obs.error(e);
    });
    return stream.pipe(share());
  };

  close = () => this.source.close();
}
