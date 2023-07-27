export default class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.type = null; // todo, doing or done
    this.existingTask = null;
    this.existingTaskId = null;
    this.taskValue = null;

    this.taskAppFirstRun();
  }

  taskAppFirstRun() {
    for (const taskType of this.model.taskTypes) {
      let tasks;
      switch (this.model.taskDataCheck(taskType)) {
        case false:
          this.model.addTaskDataTemplateToDB(taskType);
          tasks = this.model.getTasks(taskType);
          break;
        case true:
          this.model.overwriteTaskDataModel(taskType);
          tasks = this.model.getDefaultTasksFromDB(taskType);
      }
      const headerProp = this.model.getDefaultHeaderPropFromDB(taskType);
      this.view.renderDefaultTasks(taskType, tasks);
      this.view.renderDefaultHeaders(taskType, headerProp);
    }
  }

  //ACTIONS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  addNewTaskAction() {
    this.view.showTaskField(this.type);
    this.view.changeBtnMode('delete');
  }

  deleteTaskAction() {
    this.view.deleteTaskField();
    this.view.changeBtnMode('add');
    this.view.resetBtnView();
    if (this.existingTask) {
      const id = Number(this.existingTaskId);
      this.model.removeTaskfromDb(this.type, id);
    }
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

    this.existingTask = null;
  }

  changeViewBtnModeAction(mode) {
    this.view.changeBtnMode(mode);
  }

  editExistingTaskAction() {
    this.view.taskItemEdit();
    this.view.changeBtnMode('cancel');
  }

  editExistingTaskCancelAction() {
    this.view.changeBtnMode('add');
    this.view.taskItemCancelEdit();
  }

  clearAllTasksAction() {
    this.view.clearAllTasks(this.type);
    this.model.clearAllTasks(this.type);
  }

  blockNameEditAction() {
    this.view.blockNameEdit();
    this.view.changeBtnMode('cancel');
  }

  blockNameSaveAction() {
    this.view.blockNameSave();
    this.view.changeBtnMode('add');
    const newName = this.view.blockNameField.innerText;
    this.model.changeTaskBlockName(this.type, newName);
  }
  //ACTIONS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
}
