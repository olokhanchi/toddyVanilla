import Modal from '../../components/modal';
import U from '../../helpers/utils';

export default class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.taskTypes = this.model.taskTypes;

    this.type = null; // todo, doing or done
    this.btnMode = 'add';
    this.existingTask = null;
    this.existingTaskId = null;
    this.taskValue = null;

    this.draggingTaskItem = null;
    this.draggingTaskItemId = null;
    this.dragStartZone = null;
    this.dragEndZone = null;

    this.popupContent = U.emojiGenerate(this.model.emojiCodes);
    this.emojiModal = null;

    this.taskAppFirstRun();
  }

  taskAppFirstRun() {
    for (const taskType of this.taskTypes) {
      let tasks;
      switch (this.model.dataCheck(taskType)) {
        case false:
          this.model.addTaskDataTemplateToDB(taskType);
          tasks = this.model.getTasks(taskType);
          break;
        case true:
          this.model.overwriteDataModel(taskType);
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
    this.view.changeBtnMode('delete', this.type);
  }

  deleteTaskAction() {
    if (this.existingTask) {
      const id = Number(this.existingTaskId);
      this.model.removeTaskfromDb(this.type, id);
    } else {
      this.view.changeBtnMode('add', this.type);
    }
    this.view.resetBtnView(this.type);
    this.view.deleteTaskField();
  }

  saveTaskAction() {
    this.view.resetBtnView(this.type);
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
    this.view.changeBtnMode(mode, this.type);
  }

  editExistingTaskAction() {
    this.view.taskItemEdit();
    this.view.changeBtnMode('cancel', this.type);
  }

  editExistingTaskCancelAction() {
    this.view.changeBtnMode('add', this.type);
    this.view.taskItemCancelEdit();
  }

  clearAllTasksAction() {
    this.view.clearAllTasks(this.type);
    this.model.clearAllTasks(this.type);
  }

  blockNameEditAction() {
    this.view.blockNameEdit();
    this.view.changeBtnMode('cancel', this.type);
  }

  blockNameSaveAction() {
    this.view.blockNameSave();
    this.view.changeBtnMode('add', this.type);
    const newName = this.view.blockNameField.innerText;
    this.model.changeTaskBlockName(this.type, newName);
  }

  taskItemMoveAction(eventType, target) {
    switch (eventType) {
      case 'dragStart':
        this.draggingTaskItem = target;
        this.draggingTaskItemId = Number(target.dataset.taskId);
        this.dragStartZone = target.closest('[data-content]').dataset.content;
        this.view.taskItemMove(this.draggingTaskItem);
        break;
      case 'dragEnd':
        this.view.taskItemMove(this.draggingTaskItem);
        if (this.dragStartZone === this.dragEndZone) return;
        this.view.taskItemDrop(target, this.dragEndZone);
        this.model.moveTask(this.dragStartZone, this.dragEndZone, this.draggingTaskItemId);
        break;
      case 'dragEnter':
        const zone = target.dataset.content;
        this.view.taskItemOverLeaveZone(zone);
        break;
      case 'dragLeave':
        this.dragEndZone = target.dataset.content;
        this.view.taskItemOverLeaveZone(this.dragEndZone);
        break;
    }
  }

  itemDeleteOnCtrlAction() {
    this.view.toggleTaskDeleteMode();
  }

  changeEmojiAction(target) {
    const viewBlockName = target.nextElementSibling.innerText;
    const modelBlockName = target.nextElementSibling.dataset.nameType;
    const modalHeader = `Select emoji for <b>${viewBlockName}</b> board`;
    const popupSelector = '[data-popup]';

    const emojiModal = new Modal(popupSelector, target, this.popupContent, modalHeader, (emoji) => {
      target.innerText = emoji;
      this.model.changeTaskBlockEmoji(modelBlockName, emoji);
    });

    emojiModal.open();
  }

  //ACTIONS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
}
