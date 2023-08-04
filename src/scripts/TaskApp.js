import TaskModel from './models/TaskModel.js';
import TaskView from './views/TaskView.js';
import TaskController from './controllers/taskApp/TaskController.js';
import TaskEventController from './controllers/taskApp/TaskEventController.js';

export default class TaskApp {
  constructor() {
    this.taskModel = new TaskModel();
    this.taskView = new TaskView();
    this.taskController = new TaskController(this.taskModel, this.taskView);
    this.taskEventController = new TaskEventController(this.taskView, this.taskController);
  }

  bindListeners() {
    this.taskEventController.bindListeners();
  }

  removeListeners() {
    this.taskEventController.removeAllListeners();
  }
}
