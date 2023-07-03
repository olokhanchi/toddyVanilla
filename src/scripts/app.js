import TaskModel from './models/TaskModel.js';
import TaskView from './views/TaskView.js';
import TaskController from './controllers/TaskController.js';
import TaskEventController from './controllers/TaskEventController.js';

const taskModel = new TaskModel();
const taskView = new TaskView();
const taskController = new TaskController(taskModel, taskView);
const eventController = new TaskEventController(taskView, taskController);
