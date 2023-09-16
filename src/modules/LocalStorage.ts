// StorageController에 DI할 간단한 로컬스토리지 객체
export class LocalStorage {
  get<T>(key: string): T | null {
    const rawValue = localStorage.getItem(key);

    return rawValue === null ? null : (JSON.parse(rawValue) as T);
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
