export default class Storage {
  constructor(dbType = 'localStorage') {
    this.dbType = dbType;
    this.db = this.initializeDatabase();
  }

  initializeDatabase() {
    if (this.dbType === 'localStorage') {
      return window.localStorage;
    } else {
      throw new Error(`${this.dbType} unsupported`);
    }
  }

  addData(key, value) {
    this.db.setItem(key, JSON.stringify(value));
  }

  getData(key) {
    const data = this.db.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
