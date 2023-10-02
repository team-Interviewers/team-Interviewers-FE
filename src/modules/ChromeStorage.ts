// StorageController에 DI할 간단한 크롬 로컬스토리지 객체
export class ChromeStorage {
  async get<T>(key: string): Promise<T | null> {
    const rawValue = await chrome.storage['local'].get([key]);

    return rawValue[key] === undefined
      ? null
      : (JSON.parse(rawValue[key]) as T);
  }

  set<T>(key: string, value: T): void {
    chrome.storage['local'].set({ [key]: JSON.stringify(value) });
  }

  remove(key: string): void {
    chrome.storage['local'].remove(key);
  }

  clear(): void {
    chrome.storage['local'].clear();
  }
}
