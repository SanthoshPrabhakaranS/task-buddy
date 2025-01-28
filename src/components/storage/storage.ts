export class Storage {
  setItem(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string) {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }
}
