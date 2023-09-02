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

    this.emojiCodes = [
      '&#128121',
      '&#128122',
      '&#128123',
      '&#128125',
      '&#128126',
      '&#128127',
      '&#128128',
      '&#128169',
      '&#128512',
      '&#128513',
      '&#128514',
      '&#128515',
      '&#128516',
      '&#128517',
      '&#128518',
      '&#128519',
      '&#128520',
      '&#128521',
      '&#128522',
      '&#128523',
      '&#128524',
      '&#128525',
      '&#128526',
      '&#128527',
      '&#128528',
      '&#128529',
      '&#128530',
      '&#128531',
      '&#128532',
      '&#128533',
      '&#128534',
      '&#128535',
      '&#128536',
      '&#128537',
      '&#128538',
      '&#128539',
      '&#128540',
      '&#128541',
      '&#128542',
      '&#128543',
      '&#128544',
      '&#128545',
      '&#128546',
      '&#128547',
      '&#128548',
      '&#128549',
      '&#128550',
      '&#128551',
      '&#128552',
      '&#128553',
      '&#128554',
      '&#128555',
      '&#128556',
      '&#128557',
      '&#128558',
      '&#128559',
      '&#128560',
      '&#128561',
      '&#128562',
      '&#128563',
      '&#128564',
      '&#128565',
      '&#128566',
      '&#128567',
      '&#128568',
      '&#128569',
      '&#128570',
      '&#128571',
      '&#128572',
      '&#128573',
      '&#128574',
      '&#128575',
      '&#128576',
      '&#128577',
      '&#128578',
      '&#128579',
      '&#128580',
      '&#128584',
      '&#128585',
      '&#128586',
      '&#129296',
      '&#129297',
      '&#129298',
      '&#129299',
      '&#129300',
      '&#129301',
      '&#129302',
      '&#129303',
      '&#129312',
      '&#129313',
      '&#129314',
      '&#129315',
      '&#129316',
      '&#129317',
      '&#129319',
      '&#129320',
      '&#129321',
      '&#129322',
      '&#129323',
      '&#129324',
      '&#129325',
      '&#129326',
      '&#129327',
      '&#129392',
      '&#129395',
      '&#129396',
      '&#129397',
      '&#129398',
      '&#129402',
      '&#129488',
    ];
  }

  addTaskDataTemplateToDB(type) {
    this.storage.addData(type, this[type]);
  }

  addTaskToDb(type, value) {
    if (this[type] && value.id && value.description) {
      this[type].data.unshift(value);
      this.updateLocalStorage(type);
    } else {
      console.log(`Invalid type of data or value: ${type} - ${value}`);
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

  moveTask(from, to, id) {
    if (from && to && id) {
      const movingTask = this.getTasks(from).find((task) => task.id === id);
      this[from].data = this.getTasks(from).filter((task) => task.id !== id);
      this[to].data.unshift(movingTask);
      this.updateLocalStorage(from);
      this.updateLocalStorage(to);
    }
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

  changeTaskBlockEmoji(type, newEmoji) {
    this[type].properties.emoji = newEmoji;
    this.updateLocalStorage(type);
  }
}
