import Storage from '../storage/db';

export default class TaskModel {
  constructor() {
    this.storage = new Storage();
    
    this.todo = {
      properties: { name: 'todo', emoji: '😭' },
      data: [{ id: 'new', description: 'Your task items looks like this' }],
    };
    this.doing = {
      properties: { name: 'doing', emoji: '🥺' },
      data: [{ id: 'new', description: 'Right click to edit or remove' }],
    };
    this.done = {
      properties: { name: 'done', emoji: '😉' },
      data: [{ id: 'new', description: 'Drag to change task board' }],
    };

    const todoDataFromDb = this.storage.getData('todo');
    const doingDataFromDb = this.storage.getData('doing');
    const doneDataFromDb = this.storage.getData('done');

    if (!todoDataFromDb && !doingDataFromDb && !doneDataFromDb) {
      this.storage.addData('todo', this.todo);
      this.storage.addData('doing', this.doing);
      this.storage.addData('done', this.done);
    } else {
      this.todo = todoDataFromDb;
      this.doing = doingDataFromDb;
      this.done = doneDataFromDb;
    }
  }

  addTaskToDb(type, value) {
    if (this[type]) {
      this[type].data.push(value);
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

  updateLocalStorage(type) {
    this.storage.addData(type, this[type]);
  }

  getTasks(type) {
    return this[type].data;
  }
}
