import U from '../../helpers/utils';

export default class TaskEventController {
  constructor(view, controller) {
    this.view = view;
    this.controller = controller;

    this.addBtnMode = 'add'; //cancel, save or delete
    this.addBtnRole = 'newTask'; // saveBlockName or saveEditedTask

    this.handleClickEvent = this.handleClick.bind(this);
    this.handleDoubleClickEvent = this.handleDoubleClick.bind(this);
    this.handleOverOutEvent = this.handleOverOut.bind(this);
    this.handleInputEvent = this.handleInput.bind(this);
    this.handleBlurEvent = this.handleBlur.bind(this);

    this.bindListeners();
  }

  //USER EVENTS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  handleClick({ target }) {
    const targetIsAddBtn = target.hasAttribute('data-btn-add');
    const targetIsClearAllBtn = target.hasAttribute('data-btn-clear-all');

    const addBtnRoleNewTask = this.addBtnRole === 'addTask';

    if (targetIsAddBtn && addBtnRoleNewTask) {
      switch (this.addBtnMode) {
        case 'add':
          this.addTaskEffect();
          break;
        case 'cancel':
          this.cancelTaskEffect();
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
    }
  }

  handleDoubleClick({ target }) {}
  handleOverOut() {}
  handleInput({ target }) {}
  handleBlur({ target }) {}
  //USER EVENTS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  //USER EVENT EFFECTS ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  addTaskEffect() {
    this.addBtnMode = 'delete';
    this.controller.addNewTaskAction();
  }

  cancelTaskEffect() {
    this.addBtnMode = 'add';
  }

  saveTaskEffect() {
    this.addBtnMode = 'add';
    this.controller.saveNewTaskAction();
  }

  deleteTaskEffect() {
    this.addBtnMode = 'add';
    this.controller.deleteNewTaskAction();
  }

  clearAllTasksEffect() {
    this.addBtnMode = 'add';
    this.controller.clearAllTasksAction();
  }

  editBlockNameEffect() {
    this.addBtnMode = 'cancel';
    this.addBtnRole = 'saveBlockName';
  }
  editBlockNameCancelEffect() {}
  saveBlockNameEffect() {}

  //USER EVENT EFFECTS ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  //EVENT SETTERS FOR VIEW & CONTROLLER ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  setViewEventContent(target) {}
  setViewClickedBtn(target) {
    this.view.currentAddBtn = target;
  }
  setViewTaskField(target) {}
  //EVENT SETTERS FOR VIEW & CONTROLLER ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  //ON APP INIT OR DESTROY ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  bindListeners() {
    U.addEvent('click', this.view.wrapper, this.handleClickEvent);
    U.addEvent('dblclick', this.view.wrapper, this.handleDoubleClickEvent);
    U.addEvent('input', this.view.wrapper, this.handleInputEvent);
    U.addEvent('focusout', this.view.wrapper, this.handleBlurEvent);
  }

  removeAllListeners() {
    U.removeEvent('click', this.view.wrapper, this.handleClickEvent);
    U.removeEvent('dblclick', this.view.wrapper, this.handleDoubleClickEvent);
    U.removeEvent('input', this.view.wrapper, this.handleInputEvent);
    U.removeEvent('focusout', this.view.wrapper, this.handleBlurEvent);
  }
  //ON APP INIT OR DESTROY ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
}
