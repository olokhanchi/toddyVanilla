import Storage from '../storage/db';

export default class Model {
  constructor() {
    this.storage = new Storage();
  }

  taskDataCheck(type) {
    return !!this.storage.getData(type);
  }

  overwriteTaskDataModel(type) {
    this[type] = this.storage.getData(type);
  }

  updateLocalStorage(type) {
    this.storage.addData(type, this[type]);
  }
}
