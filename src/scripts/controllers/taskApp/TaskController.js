export default class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.type = null; // todo, doing or done
    this.existingTask = null;

    this.taskAppFirstRun();
  }

  taskAppFirstRun() {
    for (const taskType of this.model.taskTypes) {
      switch (this.model.taskDataCheck(taskType)) {
        case false:
          this.model.addTaskDataTemplateToDB(taskType);
          const defaultTasks = this.model.getTasks(taskType);
          this.view.renderDefaultTasks(taskType, defaultTasks);
          break;
        case true:
          this.model.overwriteTaskDataModel(taskType);
          const tasks = this.model.getDefaultTasksFromDB(taskType);
          this.view.renderDefaultTasks(taskType, tasks);
      }
    }
  }

  //ACTIONS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  addNewTaskAction() {
    this.view.showTaskField(this.type);
    this.view.changeBtnMode('delete');
  }

  deleteNewTaskAction() {
    this.view.deleteTaskField();
    this.view.changeBtnMode('add');
    this.view.resetBtnView();
  }

  changeViewBtnModeAction(mode) {
    this.view.changeBtnMode(mode);
  }

  saveTaskAction() {
    this.view.resetBtnView();
    const id = this.existingTask ? this.view.taskId : this.model.createTaskId();
    this.view.taskId = id;
    this.view.saveTaskItem();
    const description = this.view.taskValue;

    if (this.existingTask) {
      this.model.updateTask(this.type, id, description);
    } else {
      this.model.addTaskToDb(this.type, {
        id: id,
        description: description.replace(/\n/g, '<br>'),
      });
    }
  }

  editExistingTaskAction() {
    this.view.taskItemEdit();
    this.view.changeBtnMode('cancel');
  }

  saveExistingTaskAction() {}

  editExistingTaskCancelAction() {
    this.view.changeBtnMode('add');
    this.view.taskItemEdit();
  }

  clearAllTasksAction() {
    console.log(this.type);
    this.view.clearAllTasks(this.type);
    this.model.clearAllTasks(this.type);
  }

  blockNameEditAction() {}
  blockNameEditCancelAction() {}
  blockNameSaveAction() {}
  //ACTIONS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
}
