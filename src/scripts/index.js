import InterfaceView from './views/InterfaceView.js';
import InterfaceController from './controllers/InterfaceController.js';
import InterfaceModel from './models/InterfaceModel.js';
import TaskApp from './TaskApp.js';

const navigations = {
  main: {
    navigationBtnsContainers: '[data-nav-btns="main"]',
    interfacePages: '[data-main-content]',
    navigationButtons: '[data-main-btn]',
  },
  timers: {
    navigationBtnsContainers: '[data-nav-btns="timers"]',
    interfacePages: '[data-timers-content]',
    navigationButtons: '[data-timers-btn]',
  },
};

const defaultTheme = 'dark';

window.addEventListener('DOMContentLoaded', () => {
  const task = new TaskApp();
  const weather = 'weatherApp';

  const interfaceModel = new InterfaceModel(defaultTheme);
  const interfaceView = new InterfaceView();
  const interfaceController = new InterfaceController(interfaceView, navigations, interfaceModel, { task, weather });
});
