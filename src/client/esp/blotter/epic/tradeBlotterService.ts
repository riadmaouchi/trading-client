import { Observable } from 'rxjs';
import { TradeReport } from '../../tile/model/tradeReport';
import { share, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { ConnectionStatus } from '../../../layout/loader/model/serviceStatus';
import { CONNECTING, OPEN } from 'eventsource';

export default class TradeBlotterService {
  private connections: Observable<ConnectionStatus>;
  private source: EventSource;
  private tradeReports: Observable<TradeReport>;

  constructor() {
    this.source = new EventSource(
      `${process.env.TRADE_EXECUTION_API_URL}/execution`
    );

    this.connections = Observable.create(obs => {
      this.source.onopen = e =>
        obs.next(this.connectionState(this.source.readyState));

      this.source.onerror = e =>
        obs.next(this.connectionState(this.source.readyState));
    }).pipe(
      distinctUntilChanged(),
      shareReplay()
    );

    this.tradeReports = Observable.create(obs => {
      this.source.addEventListener('tradeReport', event => {
        const messageEvent = event as MessageEvent;
        obs.next(JSON.parse(messageEvent.data));
      });
      // this.source.onerror = e => obs.error(e);
    }).pipe(share());
  }

  getTradeReportStream = (): Observable<TradeReport> => this.tradeReports;

  close = () => this.source.close();

  getConnectionStream = (): Observable<ConnectionStatus> => this.connections;

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
}
