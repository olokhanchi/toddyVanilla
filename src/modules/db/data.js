export default class Data {
  constructor(dbType = 'localStorage') {
    this.dbType = dbType;
    this.db = this.initializeDatabase();
    this.length = this.initializeDatabase().length;
  }

  initializeDatabase() {
    switch (this.dbType) {
      case 'localStorage':
        return window.localStorage;
      case 'sessionStorage':
        return window.sessionStorage;
      default:
        throw new Error('Unsupported database type');
    }
  }

  addItem(key, value) {
    const oldDataFormDb = this.getData('todoData');
    const targetType = oldDataFormDb.find((d) => {
      return d.includes(key);
    });
    console.log(targetType);
  }

  addData(key, value) {
    this.db.setItem(key, JSON.stringify(value));
  }

  getData(key) {
    const data = this.db.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  updateData(key, updatedValue) {
    const existingData = this.getData(key);
    if (existingData) {
      const updatedData = { ...existingData, ...updatedValue };
      this.saveData(key, updatedData);
    }
  }

  deleteData(key) {
    this.db.removeItem(key);
  }
}
