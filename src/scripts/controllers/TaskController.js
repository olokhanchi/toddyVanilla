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

  addBtnClicked() {
    this.view.resetBtnView();
    this.view.changeBtnMode("delete");
    this.view.showTaskField();
  }

  deleteBtnClicked() {
    this.view.resetBtnView();
    this.view.removeTaskField();
  }

  saveBtnClicked() {
    const id = this.model.createTaskId();
    this.view.taskId = id;
    this.view.resetBtnView();
    this.view.saveNewTaskItem();
    const description = this.view.taskValue;
    this.model.addTaskToDb(this.type, {
      id: id,
      description: description.replace(/\n/g, "<br>"),
    });
  }
}
