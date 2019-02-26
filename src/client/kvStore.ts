import axios from 'axios';

export default class KVStore {
  private static callbacks = [];
  private static previousValues = new Map();

  constructor() {}

  static start = () => {
    KVStore.request();
    setInterval(() => {
      KVStore.request();
    }, 3000);
  };

  private static request = () => {
    axios
      .get(`${process.env.CONSUL}/v1/kv/?recurse=false`, {
        timeout: 3000
      })
      .then(response => {
        const data = response.data;
        if (data && Array.isArray(data) && data.length) {
          const values = new Map();
          data.forEach(item => {
            const key = item.Key;
            item.Value = Buffer.from(item.Value, 'base64').toString();
            if (KVStore.previousValues.get(key) !== item.Value) {
              values.set(key, item.Value);
            }
          });

          values.size &&
            KVStore.callbacks.forEach(callback => callback(values));
          values.forEach((v, k) => KVStore.previousValues.set(k, v));
        }
      })
      .catch(error => console.log(error.message));
  };

  static addListener = (
    callback: (values: Map<string, string>) => void
  ): void => {
    KVStore.callbacks.push(callback);
    !!KVStore.previousValues && callback(KVStore.previousValues);
  };
}
