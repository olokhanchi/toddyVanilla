import InterfaceView from './views/InterfaceView.js';
import InterfaceController from './controllers/InterfaceController.js';
import InterfaceModel from './models/InterfaceModel.js';
import TaskApp from './TaskApp.js';

const navigations = {
  main: {
    navigationBtnsContainer: '[data-nav-btns="main"]',
    interfacePages: '[data-main-content]',
    navigationButtons: '[data-main-btn]',
    interfaceDefaultPage: 'task',
  },
  timers: {
    navigationBtnsContainer: '[data-nav-btns="timers"]',
    interfacePages: '[data-timers-content]',
    navigationButtons: '[data-timer-btn]',
    interfaceDefaultPage: 'alarm',
  },
};

const task = new TaskApp();
const weather = 'weatherApp';

window.addEventListener('DOMContentLoaded', () => {
  const interfaceModel = new InterfaceModel();
  const interfaceView = new InterfaceView();
  const interfaceController = new InterfaceController(interfaceView, navigations, interfaceModel, { task, weather });
});
