import Model from './Model';

export default class TaskModel extends Model {
  taskTypes = ['todo', 'doing', 'done'];

  constructor() {
    super();

    this.todo = {
      properties: { name: 'todo', emoji: '😭' },
      data: [],
    };
    this.doing = {
      properties: { name: 'doing', emoji: '🥺' },
      data: [],
    };
    this.done = {
      properties: { name: 'done', emoji: '😉' },
      data: [],
    };
  }

  addTaskDataTemplateToDB(type) {
    this.storage.addData(type, this[type]);
  }

  addTaskToDb(type, value) {
    if (this[type]) {
      this[type].data.unshift(value);
      this.updateLocalStorage(type);
    } else {
      console.log(`Invalid type of data: ${type}`);
    }
  }

  removeTaskfromDb(type, id) {
    if (this[type]) {
      this[type].data = this[type].data.filter((task) => task.id !== id);
      this.updateLocalStorage(type);
    } else {
      console.log(`Invalid type of data: ${type}`);
    }
  }

  clearAllTasks(type) {
    this[type].data = [];
    this.updateLocalStorage(type);
  }

  getTasks(type) {
    return this[type]?.data;
  }

  updateTask(type, id, newDescription) {
    this.getTasks(type).map((task) => {
      if (task.id === id) {
        return (task.description = newDescription);
      }
    });
    this.updateLocalStorage(type);
  }

  getDefaultTasksFromDB(type) {
    return this.storage.getData(type)?.data;
  }

  getDefaultHeaderPropFromDB(type) {
    return this.storage.getData(type)?.properties;
  }

  createTaskId() {
    return new Date().getTime();
  }

  changeTaskBlockName(type, newName) {
    this[type].properties.name = newName;
    this.updateLocalStorage(type);
  }
}
