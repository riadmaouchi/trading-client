import { Observable } from 'rxjs';
import axios from 'axios';
import { SubmitOrder } from '../model/submitOrder';
import { Order } from '../model/order';

export default class OrderService {
  submitOrder = (submitOrder: SubmitOrder): Observable<Order> => {
    return Observable.create(obs => {
      axios
        .post(
          `${process.env.TRADE_EXECUTION_API_URL}/order/new`,
          JSON.stringify(submitOrder),
          { timeout: 3000 }
        )
        .then(response => {
          obs.next(response.data);
          obs.complete();
        })
        .catch(error => {
          console.log('error');
          obs.error(error.message);
        });
    });
  };
}
