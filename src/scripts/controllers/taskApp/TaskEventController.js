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
      this.mouseOnAddBtn = true;

      this.assignViewCurrentElements(target, 'click');
      this.assignControllerObjectTypeField(target, 'click');

      this.eventTarget = target;

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
  }

  handleInput({ target }) {
    const targetIsTaskField = target.hasAttribute('data-task-field');

    if (targetIsTaskField) {
      this.assignViewCurrentElements(target, 'input');
      if (!target.textContent.trim()) return this.emptyTaskValueEffect();
      this.fillTaskValueEffect();
    }
  }

  handleDoubleClick({ target }) {
    const targetIsBlockName = target.hasAttribute('data-block-name');
    const targetIsTaskField = target.hasAttribute('data-task-field');

    if (targetIsTaskField && !this.hasDoubleClick) {
      this.hasDoubleClick = true;
      this.assignViewCurrentElements(target, 'dbclick');
      this.assignControllerObjectTypeField(target, 'dbclick');
      this.editTaskEffect();
    }

    if (targetIsBlockName && !this.hasDoubleClick) {
      this.hasDoubleClick = true;
      this.assignViewCurrentElements(target, 'dbclick');
      this.assignControllerObjectTypeField(target, 'dbclick');
      this.editBlockNameEffect();
    }
  }

  handleBlur({ target }) {
    const targetIsTaskField = target.hasAttribute('data-task-field');
    const targetIsBlockNameField = target.hasAttribute('data-block-name');

    if (targetIsTaskField) {
      this.hasDoubleClick = false;
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
    U.addEvent('mouseover', this.eventTarget, this.handleOverOutEvent);
    U.addEvent('mouseout', this.eventTarget, this.handleOverOutEvent);
    this.controller.addNewTaskAction();
    this.addBtnMode = 'delete';
  }

  cancelTaskEffect() {
    this.controller.editExistingTaskCancelAction();
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
    U.removeEvent('mouseover', this.eventTarget, this.handleOverOutEvent);
    U.removeEvent('mouseout', this.eventTarget, this.handleOverOutEvent);
    this.controller.saveTaskAction();
    this.addBtnMode = 'add';
    this.mouseOnAddBtn = false;
  }

  editTaskEffect() {
    U.addEvent('mouseover', this.eventTarget, this.handleOverOutEvent);
    U.addEvent('mouseout', this.eventTarget, this.handleOverOutEvent);
    this.addBtnMode = 'cancel';
    this.controller.editExistingTaskAction();
    this.mouseOnAddBtn = false;
  }

  deleteTaskEffect() {
    U.removeEvent('mouseover', this.eventTarget, this.handleOverOutEvent);
    U.removeEvent('mouseout', this.eventTarget, this.handleOverOutEvent);
    this.controller.deleteNewTaskAction();
    this.addBtnMode = 'add';
    this.mouseOnAddBtn = false;
  }

  clearAllTasksEffect() {
    this.controller.clearAllTasksAction();
    this.addBtnMode = 'add';
  }

  editBlockNameEffect() {
    this.controller.blockNameEditAction();
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
    }
    if (eventType === 'dbclick') {
      this.controller.type = target.closest('[data-task-block]').dataset.type;
      this.controller.existingTask = target.hasAttribute('data-task-field') ? true : null;
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
      if (target.hasAttribute('data-task-field')) {
        this.view.taskField = target;
        this.view.taskId = Number(target.parentNode.dataset.taskId);
        this.view.currentClickedContent = target.parentNode.parentNode;
      } else {
        this.view.blockNameField = target;
      }
      this.view.addBtn = target.closest('[data-task-block]').querySelector('[data-btn-add]');
      this.eventTarget = this.view.addBtn;
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
