import { Observable } from 'rxjs';
import { TradeReport } from '../../tile/model/tradeReport';
import { share } from 'rxjs/operators';
import { ConnectionStatus } from '../../../layout/loader/model/serviceStatus';

export default class TradeBlotterService {
  private source: EventSource;

  connect = (url: string) => {
    this.source = new EventSource(`${url}/v1/execution`);
  };

  getTradeReportStream = (): Observable<TradeReport> => {
    return new Observable<TradeReport>(obs => {
      this.source.addEventListener('tradeReport', event => {
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
