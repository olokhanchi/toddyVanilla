import U from '../../helpers/utils';

export default class TaskEventController {
  constructor(view, controller) {
    this.view = view;
    this.controller = controller;

    this.addBtnMode = 'add'; //cancel, save or delete
    this.addBtnRole = 'newTask'; // saveBlockName or saveEditedTask

    this.cancelBlur = false;

    this.handleClickEvent = this.handleClick.bind(this);
    this.handleDoubleClickEvent = this.handleDoubleClick.bind(this);
    this.handleInputEvent = this.handleInput.bind(this);
    this.handleBlurEvent = this.handleBlur.bind(this);

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

  handleDoubleClick({ target }) {}

  handleBlur({ target }) {
    const targetIsTaskField = target.hasAttribute('data-task-field');
    const targetIsBlockNameField = target.hasAttribute('data-block-name');

    if (targetIsTaskField) {
      if (target.textContent.trim()) return this.saveTaskEffect();
      this.deleteTaskEffect();
    }

    if (targetIsBlockNameField) {
      this.controller.type = target.dataset.nameType;
      this.controller.blockNameHasChanges();
      this.addBtnMode = 'save';
    }
  }
  //USER EVENTS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  //USER EVENT EFFECTS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  addTaskEffect() {
    this.controller.addNewTaskAction();
    this.addBtnMode = 'delete';
  }

  cancelTaskEffect() {
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
    this.controller.saveNewTaskAction();
    this.addBtnMode = 'add';
  }

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
    if (eventType === 'click') this.controller.type = target.dataset.btnType;
  }

  assignViewCurrentElements(target, eventType) {
    if (eventType === 'click') {
      this.view.addBtn = target;
      this.view.currentClickedContent = target.parentNode.nextElementSibling;
    }
    if (eventType === 'input') {
      this.view.taskField = target;
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
