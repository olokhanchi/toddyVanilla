import U from '../../helpers/utils';

export default class TaskEventController {
  constructor(view, controller) {
    this.view = view;
    this.controller = controller;

    this.addBtnMode = 'add'; //cancel, save or delete
    this.addBtnRole = 'newTask'; // saveBlockName or saveEditedTask

    this.mouseOnAddBtn = false;
    this.hasDoubleClick = false;

    this.handleClickEvent = this.handleClick.bind(this);
    this.handleDoubleClickEvent = this.handleDoubleClick.bind(this);
    this.handleInputEvent = this.handleInput.bind(this);
    this.handleBlurEvent = this.handleBlur.bind(this);
    this.handleOverOutEvent = this.handleOverOut.bind(this);
    this.eventTarget = null;

    this.bindListeners();
  }

  //USER EVENTS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  handleClick({ target }) {
    const targetIsAddBtn = target.hasAttribute('data-btn-add');
    const targetIsClearAllBtn = target.hasAttribute('data-btn-clear-all');
    const addBtnRoleNewTask = this.addBtnRole === 'newTask';

    if (targetIsAddBtn && addBtnRoleNewTask) {
      this.assignViewCurrentElements(target, 'click');

      if (this.addBtnMode === 'save') return this.saveTaskEffect();

      this.assignControllerObjectTypeField(target, 'click');

      this.mouseOnAddBtn = true;

      this.eventTarget = target;
      U.addEvent('mouseout', this.eventTarget, this.handleOverOutEvent);
      U.addEvent('mouseover', this.eventTarget, this.handleOverOutEvent);

      switch (this.addBtnMode) {
        case 'add':
          this.addTaskEffect();
          break;
        case 'delete':
          this.deleteTaskEffect();
          break;
        case 'save':
          this.saveTaskEffect();
          break;
        case 'cancel':
          this.cancelTaskEffect();
          break;
        default:
          throw new Error(`There are no methods for ${this.addBtnMode} action`);
      }
      return;
    }

    if (targetIsClearAllBtn) {
      this.assignViewCurrentElements(target, 'click');
      this.assignControllerObjectTypeField(target, 'click');
      this.clearAllTasksEffect();
    }
  }

  handleOverOut() {
    this.mouseOnAddBtn = !this.mouseOnAddBtn;
    console.log(this.mouseOnAddBtn);
  }

  handleInput({ target }) {
    const targetIsTaskField = target.hasAttribute('data-task-field');

    if (targetIsTaskField) {
      this.assignViewCurrentElements(target, 'input');
      if (!target.textContent.trim()) {
        this.emptyTaskValueEffect();
        return;
      }
      this.fillTaskValueEffect();
    }
  }

  handleDoubleClick({ target }) {
    const targetIsBlockName = target.hasAttribute('data-block-name');
    const targetIsTaskField = target.hasAttribute('data-task-field');

    if (targetIsTaskField && !this.hasDoubleClick) {
      this.mouseOnAddBtn = true;
      this.assignViewCurrentElements(target, 'dbclick');
      this.assignControllerObjectTypeField(target, 'dbclick');

      this.hasDoubleClick = true;
      this.editTaskEffect();
    }
  }

  handleBlur({ target }) {
    const targetIsTaskField = target.hasAttribute('data-task-field');
    const targetIsBlockNameField = target.hasAttribute('data-block-name');

    if (targetIsTaskField) {
      U.removeEvent('mouseover', this.eventTarget, this.handleOverOutEvent);
      U.removeEvent('mouseout', this.eventTarget, this.handleOverOutEvent);
    }

    if (targetIsTaskField && !this.mouseOnAddBtn) {
      if (target.textContent.trim()) {
        this.saveTaskEffect();
      } else {
        this.deleteTaskEffect();
      }
    }

    if (targetIsBlockNameField) {
      this.saveBlockNameEffect();
    }
  }
  //USER EVENTS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  //USER EVENT EFFECTS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  addTaskEffect() {
    this.controller.addNewTaskAction();
    this.addBtnMode = 'delete';
  }

  cancelTaskEffect() {
    this.view.editExistingTaskCancelAction();
    this.addBtnMode = 'add';
  }

  fillTaskValueEffect() {
    this.controller.changeViewBtnModeAction('save');
    this.addBtnMode = 'save';
  }

  emptyTaskValueEffect() {
    this.controller.changeViewBtnModeAction('delete');
    this.addBtnMode = 'delete';
  }

  saveTaskEffect() {
    this.controller.saveTaskAction();
    this.addBtnMode = 'add';
  }

  editTaskEffect() {
    this.controller.editExistingTaskAction();
    this.addBtnMode = 'cancel';
  }

  saveNewTaskEffect() {}

  deleteTaskEffect() {
    this.controller.deleteNewTaskAction();
    this.addBtnMode = 'add';
  }

  clearAllTasksEffect() {
    this.controller.clearAllTasksAction();
    this.addBtnMode = 'add';
  }

  editBlockNameEffect() {
    this.addBtnMode = 'cancel';
    this.addBtnRole = 'saveBlockName';
  }

  editBlockNameCancelEffect() {
    this.addBtnMode = 'add';
    this.addBtnRole = 'newTask';
  }

  saveBlockNameEffect() {
    this.addBtnMode = 'add';
    this.addBtnRole = 'newTask';
  }

  //USER EVENT EFFECTS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  //EVENT SETTERS FOR VIEW & CONTROLLER ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  assignControllerObjectTypeField(target, eventType) {
    if (eventType === 'click') {
      this.controller.type = target.dataset.btnType;
      this.controller.existingTask = null;
    }
    if (eventType === 'dbclick') {
      this.controller.type = target.closest('[data-task-block]').dataset.type;
      this.controller.existingTask = true;
    }
  }

  assignViewCurrentElements(target, eventType) {
    if (eventType === 'click') {
      this.view.addBtn = target;
      this.view.currentClickedContent = target.parentNode.nextElementSibling;
    }
    if (eventType === 'input') {
      this.view.taskField = target;
    }
    if (eventType === 'dbclick') {
      this.view.taskField = target;
      this.view.addBtn = target.closest('[data-task-block]').querySelector('[data-btn-add]');
      this.view.taskId = Number(target.parentNode.dataset.taskId);
    }
  }

  //EVENT SETTERS FOR VIEW & CONTROLLER ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  //ON APP INIT OR DESTROY ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  bindListeners() {
    U.addEvent('click', this.view.wrapper, this.handleClickEvent);
    U.addEvent('dblclick', this.view.wrapper, this.handleDoubleClickEvent);
    U.addEvent('input', this.view.wrapper, this.handleInputEvent);
    U.addEvent('blur', this.view.wrapper, this.handleBlurEvent, true);
  }

  removeAllListeners() {
    U.removeEvent('click', this.view.wrapper, this.handleClickEvent);
    U.removeEvent('dblclick', this.view.wrapper, this.handleDoubleClickEvent);
    U.removeEvent('input', this.view.wrapper, this.handleInputEvent);
    U.removeEvent('focusout', this.view.wrapper, this.handleBlurEvent);
  }
  //ON APP INIT OR DESTROY ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
}
