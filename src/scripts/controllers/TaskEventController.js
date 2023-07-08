import U from '../helpers/utils';

export default class TaskEventController {
  constructor(view, controller) {
    this.view = view;
    this.controller = controller;
    this.addBtnMode = 'add';
    this.addBtnRole = 'addTask'; // or saveBlockName
    this.bindListeners();
    // this.removeListeners();
  }

  handleClick(e) {
    const targetIsAddBtn = U.findTargetUp(e, '[data-btn-add]');
    const addBtnRoleNewTask = this.addBtnRole === 'addTask';

    if (targetIsAddBtn && addBtnRoleNewTask) {
      this.view.currentAddBtn = targetIsAddBtn;
      const content = targetIsAddBtn.parentNode.nextElementSibling;
      this.controller.type = targetIsAddBtn.dataset.btnType;
      this.view.currentClickedContent = content;

      switch (this.addBtnMode) {
        case 'add':
          this.handleAddButton();
          break;
        case 'delete':
          this.handleDeleteButton();
          break;
        case 'save':
          this.handleSaveButton();
          break;

        default:
          console.log('Mode not found');
          break;
      }
    }
  }
  handleInput(e) {
    this.addBtnMode = 'add';
    this.view.currentTaskField = e.target;
    if (e.target.textContent.trim()) {
      this.addBtnMode = 'save';
      this.view.changeBtnMode('save');
    } else {
      this.addBtnMode = 'delete';
      this.view.changeBtnMode('delete');
    }
  }

  handleAddButton() {
    this.controller.addBtnClicked();
    this.addBtnMode = 'delete';
  }

  handleDeleteButton() {
    this.controller.deleteBtnClicked();
    this.addBtnMode = 'add';
  }

  handleSaveButton() {
    this.controller.saveBtnClicked();
    this.addBtnMode = 'add';
  }

  bindListeners() {
    U.addEvent('click', this.view.todoBlock, (e) => this.handleClick(e));
    U.addEvent('click', this.view.doingBlock, (e) => this.handleClick(e));
    U.addEvent('click', this.view.doneBlock, (e) => this.handleClick(e));

    U.addEvent('input', this.view.todoBlock, (e) => this.handleInput(e));
    U.addEvent('input', this.view.doingBlock, (e) => this.handleInput(e));
    U.addEvent('input', this.view.doneBlock, (e) => this.handleInput(e));
  }

  removeListeners() {
    U.removeEvent('click', this.view.todoBlock, () => this.handleClick());
    U.removeEvent('click', this.view.doingBlock, () => this.handleClick());
    U.removeEvent('click', this.view.doneBlock, () => this.handleClick());

    U.removeEvent('input', this.view.todoBlock, () => this.handleInput());
    U.removeEvent('input', this.view.doingBlock, () => this.handleInput());
    U.removeEvent('input', this.view.doneBlock, () => this.handleInput());
  }
}
