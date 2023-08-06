import Model from './Model';

export default class InterfaceModel extends Model {
  constructor() {
    super();
  }

  addThemeToDB(theme) {
    this.storage.addData('theme', theme);
  }
  getThemeFromDB() {
    return this.storage.getData('theme');
  }
}
