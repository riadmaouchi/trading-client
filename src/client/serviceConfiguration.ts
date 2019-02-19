export interface Storage {
  put(key: string, value: string);
  get(key: string): string;
}

export enum StorageKind {
  Consul,
  InMemory
}

class RedisStorage implements Storage {
  put(key: string, value: string) {
    //... do something
  }

  get(key: string): string {
    return 'foo';
  }
}

class InMemoryStorage implements Storage {
  put(key: string, value: string) {
    //... do something
  }

  get(key: string): string {
    return 'foo';
  }
}

export function createStorage(kind: StorageKind): Storage {
  switch (kind) {
    case StorageKind.Consul:
      return new RedisStorage();
    case StorageKind.InMemory:
      return new InMemoryStorage();
  }
}
