import { Observable } from 'rxjs';
import { TradeReport } from '../model/tradeReport';
import axios from 'axios';
import { TradeRequest } from '../model/tradeRequest';

export default class ExecutionService {
  tradeRequest = (
    url: string,
    tradeRequest: TradeRequest
  ): Observable<TradeReport> =>
    Observable.create(obs =>
      axios
        .post(`${url}/v1/execution`, JSON.stringify(tradeRequest), {
          timeout: 3000
        })
        .then(response => {
          obs.next(response.data);
          obs.complete();
        })
        .catch(error => obs.error(error.message))
    );
}
