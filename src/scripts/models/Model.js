import Storage from '../storage/db';

export default class Model {
  constructor() {
    this.storage = new Storage();
  }

  dataCheck(type) {
    return !!this.storage.getData(type);
  }

  overwriteDataModel(type) {
    this[type] = this.storage.getData(type);
  }

  updateLocalStorage(type) {
    this.storage.addData(type, this[type]);
  }
}
