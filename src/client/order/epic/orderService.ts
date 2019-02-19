import { Observable } from 'rxjs';
import axios from 'axios';
import { SubmitOrder } from '../model/submitOrder';
import { Order } from '../model/order';

export default class OrderService {
  submitOrder = (url: string, submitOrder: SubmitOrder): Observable<Order> =>
    Observable.create(obs =>
      axios
        .post(`${url}/v1/order/new`, JSON.stringify(submitOrder), {
          timeout: 3000
        })
        .then(response => {
          obs.next(response.data);
          obs.complete();
        })
        .catch(error => obs.error(error.message))
    );
}
