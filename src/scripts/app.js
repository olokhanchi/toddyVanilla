import TaskModel from './models/TaskModel.js';
import TaskView from './views/TaskView.js';
import TaskController from './controllers/taskApp/TaskController.js';
import TaskEventController from './controllers/taskApp/TaskEventController.js';

const taskModel = new TaskModel();
const taskView = new TaskView();
const taskController = new TaskController(taskModel, taskView);
const taskEventController = new TaskEventController(taskView, taskController);
