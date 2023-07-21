import U from '../helpers/utils';

export default class TaskEventController {
  constructor(view, controller) {
    this.view = view;
    this.controller = controller;
    this.addBtnMode = 'add';
    this.addBtnRole = 'addTask'; // saveBlockName, saveEditedTask
    this.mouseOnAddBtn = false;
    this.hasDoubleClick = false;

    this.handleClickEvent = this.handleClick.bind(this);
    this.handleDoubleClickEvent = this.handleDoubleClick.bind(this);
    this.handleOverOutEvent = this.handleOverOut.bind(this);
    this.handleInputEvent = this.handleInput.bind(this);
    this.handleBlurEvent = this.handleBlur.bind(this);

    this.bindListeners();
    //    this.removeAllListeners();
  }

  //event handlers

  handleClick({ target }) {
    const targetIsAddBtn = target.hasAttribute('data-btn-add');
    const targetIsClearAllBtn = target.hasAttribute('data-btn-clear-all');
    const addBtnRoleNewTask = this.addBtnRole === 'addTask';

    if (targetIsAddBtn && addBtnRoleNewTask) {
      const content = target.parentNode.nextElementSibling;
      this.view.currentAddBtn = target;
      this.controller.type = target.dataset.btnType;
      this.view.currentClickedContent = content;
      this.mouseOnAddBtn = true;

      U.addEvent('mouseover', target, this.handleOverOutEvent);
      U.addEvent('mouseout', target, this.handleOverOutEvent);

      switch (this.addBtnMode) {
        case 'add':
          this.handleAddButtonAction();
          break;
        case 'cancel':
          this.handleCancelButtonAction('task');
          break;
        case 'delete':
          this.handleDeleteButtonAction();
          break;
        case 'save':
          this.handleSaveButtonAction('task');
          break;
        default:
          console.log('Mode not found');
          break;
      }
    }

    if (targetIsAddBtn && !addBtnRoleNewTask) {
      this.view.currentAddBtn = target;
      this.mouseOnAddBtn = true;
      this.hasDoubleClick = false;

      switch (this.addBtnMode) {
        case 'cancel':
          this.handleCancelButtonAction('blockName');
          break;
        case 'save':
          this.handleSaveButtonAction('blockName');
          break;
        default:
          console.log('Mode not found');
          break;
      }
    }

    if (targetIsClearAllBtn) {
      this.controller.type = target.dataset.btnType;
      this.handleClearAllButtonAction();
    }
  }

  handleDoubleClick({ target }) {
    const targetIsBlockName = target.hasAttribute('data-block-name');
    const targetIsTaskField = target.hasAttribute('data-task-field');

    if (targetIsBlockName && !this.hasDoubleClick) {
      this.hasDoubleClick = true;
      this.addBtnRole = 'saveEditedTask';
      this.view.currentBlockNameField = target;
      this.view.currentAddBtn = target.nextElementSibling;
      this.controller.type = target.dataset.nameType;
      this.handleBlockNameEditAction();
    }

    if (targetIsTaskField && !this.hasDoubleClick) {
      this.addBtnRole = 'saveEditedTask';
      this.addBtnMode = 'cancel';
      this.hasDoubleClick = true;
      this.mouseOnAddBtn = false;
      this.view.currentTaskField = target;
      this.view.currentAddBtn = target.closest('[data-task-block]').querySelector('[data-btn-add]');
      this.handleTaskItemEditAction();
    }
  }

  handleOverOut() {
    this.mouseOnAddBtn = !this.mouseOnAddBtn;
  }

  handleInput({ target }) {
    const targetIsTaskField = target.hasAttribute('data-task-field');
    const targetIsBlockNameField = target.hasAttribute('data-block-name');

    if (targetIsTaskField) {
      this.addBtnMode = 'add';
      this.view.currentTaskField = target;
      if (target.textContent.trim()) {
        this.addBtnMode = 'save';
        this.view.changeBtnMode('save');
      } else {
        this.addBtnMode = 'delete';
        this.view.changeBtnMode('delete');
      }
    }

    if (targetIsBlockNameField) {
      this.controller.type = target.dataset.nameType;
      this.addBtnMode = 'save';
      this.controller.blockNameHasChanges();
    }
  }

  handleBlur({ target }) {
    const targetIsTaskField = target.hasAttribute('data-task-field');

    if (targetIsTaskField && !this.mouseOnAddBtn) {
      this.hasDoubleClick = false;
      if (target.textContent.trim()) {
        this.handleSaveButtonAction('task');
      } else {
        this.handleDeleteButtonAction();
      }
      U.removeEvent('mouseover', this.view.currentAddBtn, this.handleOverOutEvent);
      U.removeEvent('mouseout', this.view.currentAddBtn, this.handleOverOutEvent);
    }
  }

  //  actions

  handleAddButtonAction() {
    this.controller.addBtnClicked();
    this.addBtnMode = 'delete';
  }

  handleDeleteButtonAction() {
    this.controller.deleteBtnClicked();
    this.addBtnMode = 'add';
  }

  handleSaveButtonAction(role) {
    this.controller.saveBtnClickedFor(role);
    this.addBtnMode = 'add';
    this.addBtnRole = 'addTask';
  }

  handleClearAllButtonAction() {
    this.controller.clearAllBtnClicked();
    this.addBtnMode = 'add';
  }

  handleCancelButtonAction(role) {
    this.controller.cancelBtnClicked(role);
    this.addBtnMode = 'add';
    this.addBtnRole = 'addTask';
  }

  handleBlockNameEditAction() {
    this.controller.blockNameReceiveFocus();
    this.addBtnMode = 'cancel';
    this.addBtnRole = 'saveBlockName';
  }

  handleBlockNameSaveAction() {
    this.controller.blockNameLostFocus();
    this.addBtnMode = 'add';
    this.addBtnRole = 'addTask';
  }

  handleTaskItemEditAction() {
    this.controller.taskItemReceiveFocus();
  }

  // event binding and detach
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
}
