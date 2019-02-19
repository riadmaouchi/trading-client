import axios from 'axios';
import Multimap from 'multimap';

export default class KVStore {
  private static callbacks = new Multimap();
  private static values = new Map();

  constructor() {}

  static start = () => {
    KVStore.request();
    setInterval(() => {
      KVStore.request();
    }, 3000);
  };

  private static request = () => {
    axios
      .get(`${process.env.CONSUL}/v1/kv/service/url?recurse=false`, {
        timeout: 3000
      })
      .then(response => {
        const data = response.data;
        if (data && Array.isArray(data) && data.length) {
          data.forEach(item => {
            const key = item.Key;
            item.Value = Buffer.from(item.Value, 'base64').toString();
            if (KVStore.values.get(key) !== item.Value) {
              KVStore.values.set(key, item.Value);
              if (KVStore.callbacks.has(key)) {
                KVStore.callbacks
                  .get(key)
                  .forEach(callback => callback(item.Value));
              }
            }
          });
        }
      })
      .catch(error => console.log(error.message));
  };

  static addListener = (key: string, callback: any) => {
    KVStore.callbacks.set(key, callback);
    if (KVStore.values.has(key)) {
      callback(KVStore.values.get(key));
    }
  };
}
