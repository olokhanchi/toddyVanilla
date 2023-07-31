import U from '../../helpers/utils';

export default class TaskEventController {
  constructor(view, controller) {
    this.view = view;
    this.controller = controller;

    this.addBtnMode = 'add'; //cancel, save or delete
    this.addBtnRole = 'newTask'; // saveBlockName

    this.mouseOnAddBtn = false;
    this.hasDoubleClick = false;

    this.handleClickEvent = this.handleClick.bind(this);
    this.handleDoubleClickEvent = this.handleDoubleClick.bind(this);
    this.handleInputEvent = this.handleInput.bind(this);
    this.handleBlurEvent = this.handleBlur.bind(this);
    this.handleOverOutEvent = this.handleOverOut.bind(this);
    this.handleKeyDownEvent = this.handleKeyDown.bind(this);
    this.handleKeyUpEvent = this.handleKeyUp.bind(this);
    this.eventTarget = null;
    this.blockNameIsEmpty = false;
    this.ctrlKey = false;

    this.bindListeners();
  }

  //USER EVENTS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  handleClick({ target, ctrlKey }) {
    const targetIsAddBtn = target.hasAttribute('data-btn-add');
    const targetIsClearAllBtn = target.hasAttribute('data-btn-clear-all');
    const targetIsTaskItem = target.hasAttribute('data-task-id') || target.hasAttribute('data-task-field');
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

    if (targetIsAddBtn && !addBtnRoleNewTask) {
      if (this.addBtnMode === 'save' || this.addBtnMode === 'cancel') {
        this.saveBlockNameEffect();
      } else {
        throw new Error(`There are no methods for ${this.addBtnMode} action`);
      }
    }

    if (targetIsTaskItem && ctrlKey) {
      this.assignViewCurrentElements(target, 'ctrlClick');
      this.assignControllerObjectTypeField(target, 'ctrlClick');
      this.deleteTaskEffect();
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
    const targetIsBlockNameField = target.hasAttribute('data-block-name');

    if (targetIsTaskField) {
      !target.textContent.trim() ? this.emptyValueEffect() : this.fillValueEffect();
    }

    if (targetIsBlockNameField) {
      if (!target.textContent.trim()) {
        this.blockNameIsEmpty = true;
      } else {
        this.fillValueEffect();
        this.blockNameIsEmpty = false;
      }
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
      this.prevBlockName = target.innerText.trim();
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
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') e.preventDefault();
    if (e.key === 'Control') {
      this.ctrlKey = true;
      this.deleteTaskModeToggleEffect();
    }
  }

  handleKeyUp({ key }) {
    if (key === 'Control') {
      this.ctrlKey = false;
      this.deleteTaskModeToggleEffect();
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

  fillValueEffect() {
    this.controller.changeViewBtnModeAction('save');
    this.addBtnMode = 'save';
  }

  emptyValueEffect() {
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
    this.controller.deleteTaskAction();
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

  saveBlockNameEffect() {
    if (!this.blockNameIsEmpty) {
      this.controller.blockNameSaveAction();
      this.addBtnMode = 'add';
      this.addBtnRole = 'newTask';
      this.hasDoubleClick = false;
    }
  }

  deleteTaskModeToggleEffect() {
    if (this.addBtnMode === 'add' && this.addBtnRole === 'newTask') this.controller.modeToggler();
  }

  //USER EVENT EFFECTS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  //EVENT SETTERS FOR VIEW & CONTROLLER ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  assignControllerObjectTypeField(target, eventType) {
    if (eventType === 'click') {
      this.controller.type = target.dataset.btnType;
    }
    if (eventType === 'ctrlClick') {
      this.controller.type = target.closest('[data-task-block]').dataset.type;
      this.controller.existingTask = true;
      this.controller.existingTaskId = target.dataset.taskId;
    }
    if (eventType === 'dbclick') {
      this.controller.type = target.closest('[data-task-block]').dataset.type;
      this.controller.existingTask = target.hasAttribute('data-task-field') ? true : null;
      this.controller.existingTaskId = target.parentNode.dataset.taskId;
    }
  }

  assignViewCurrentElements(target, eventType) {
    if (eventType === 'click') {
      this.view.addBtn = target;
      this.view.currentClickedContent = target.parentNode.nextElementSibling;
    }
    if (eventType === 'ctrlClick') {
      this.view.taskField = target.firstChild;
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
    U.addEvent('keydown', '', this.handleKeyDownEvent);
    U.addEvent('keyup', '', this.handleKeyUpEvent);
  }

  removeAllListeners() {
    U.removeEvent('click', this.view.wrapper, this.handleClickEvent);
    U.removeEvent('dblclick', this.view.wrapper, this.handleDoubleClickEvent);
    U.removeEvent('input', this.view.wrapper, this.handleInputEvent);
    U.removeEvent('focusout', this.view.wrapper, this.handleBlurEvent);
    U.removeEvent('keydown', '', this.handleKeyDownEvent);
    U.removeEvent('keyup', '', this.handleKeyDownEvent);
  }
  //ON APP INIT OR DESTROY ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
}
