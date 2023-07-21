export default class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.type = null; // todo, doing or done

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
  addNewTaskAction() {}
  saveNewTaskAction() {}
  deleteNewTaskAction() {}
  editExistingTaskAction() {}
  editExistingTaskCancelAction() {}
  saveExistingTaskAction() {}
  clearAllTasksAction() {}
  blockNameEditAction() {}
  blockNameEditCancelAction() {}
  blockNameSaveAction() {}
  //ACTIONS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
}
