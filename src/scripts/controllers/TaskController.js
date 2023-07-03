export default class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.addBtnMission = 'newTask'; // save name
    this.addBtnMode = 'add';
    this.renderAvailableTasks();
  }

  renderAvailableTasks() {
    const types = ['todo', 'doing', 'done'];
    for (const type of types) {
      const tasks = this.model.getTasks(type);
      this.view.renderTasks(type, tasks);
    }
  }

  addTask(type, id, description) {
    const task = { id: id, description: description };
    this.model.addTaskToDb(type, task);
    this.updateView();
  }

  removeTask(type, id) {
    this.model.removeTaskfromDb(type, id);
    this.updateView(type);
  }

  updateView(type) {
    const tasks = this.model.getTasks(type);
    this.view.renderTasks(type, tasks);
  }

  changeAddBtnModeTo(mode){
    
  }
}
