import Storage from '../storage/db';

export default class TaskModel {
  taskTypes = ['todo', 'doing', 'done'];

  constructor() {
    this.storage = new Storage();

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

  taskDataCheck(type) {
    return !!this.storage.getData(type);
  }

  addTaskDataTemplateToDB(type) {
    this.storage.addData(type, this[type]);
  }

  overwriteTaskDataModel(type) {
    this[type] = this.storage.getData(type);
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

  updateLocalStorage(type) {
    this.storage.addData(type, this[type]);
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

  createTaskId() {
    return new Date().getTime();
  }

  changeTaskBlockName(type, newName) {
    this[type].properties.name = newName;
    this.updateLocalStorage(type);
  }
}
