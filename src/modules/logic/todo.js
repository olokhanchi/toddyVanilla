import Data from '../db/data';
import U from '../helpers/utils';

export default class Todo extends Data {
  constructor(wrapper) {
    super();
    this.todoWrapper = document.querySelector(wrapper);
    this.boards = null;
    this.currentBlock = null;
    this.currentContent = null;
    this.currentAddBtn = null;
    this.addBtnFor = 'addTask';
    this.addBtnMode = 'add';
    this.newTaskField = null;
    this.cancelBlur = true;
  }

  createTodoData() {
    return [...U.todoDataTemplate()];
  }

  renderBoardsFromDb() {
    const boards = this.getData('todoData').map((boardData) => {
      const boardName = boardData[1].name;
      const boardEmoji = boardData[1].emoji;
      const boardTasks = boardData[1].tasks;

      const taskItems = boardTasks.map((task) => U.taskTemplate(task.id, task.description).trim()).join('');

      return U.boardTemplate(boardName, boardEmoji, taskItems).trim();
    });

    this.todoWrapper.innerHTML = boards.join('');
  }

  createTaskElementOn(blockContent) {
    const taskAddItemHTML = U.taskTemplate('', '', 'new task', true).trim();
    blockContent.insertAdjacentHTML('afterbegin', taskAddItemHTML);
    const taskAddItemField = blockContent.querySelector('[contenteditable="true"]');
    this.newTaskField = taskAddItemField;
    taskAddItemField.focus();
  }

  bindListeners() {
    const todoBoards = Array.from(this.todoWrapper.querySelectorAll('[data-task-block]'));
    this.boards = todoBoards;

    const overOutHandler = () => {
      this.cancelBlur = !this.cancelBlur;
    };

    const clickHandler = (e) => {
      const targetIsAddBtn = U.findTargetUp(e, '[data-btn-add]');
      const targetIsEmojiBtn = U.findTargetUp(e, '[data-btn-emoji]');
      const addBtnForTask = this.addBtnFor === 'addTask';

      if (targetIsAddBtn && addBtnForTask) {
        this.todoWrapper.querySelectorAll('[data-btn-add]').forEach((btn) => {
          btn.innerText = '+add';
          btn.style.removeProperty('color');
        });

        this.currentAddBtn = targetIsAddBtn;
        const clickEventBlock = U.findTargetUp(e, '[data-task-block]');
        const clickEventContent = clickEventBlock.querySelector('[data-content]');
        this.currentContent = clickEventContent;

        U.addEvent('mouseover', this.currentAddBtn, overOutHandler);
        U.addEvent('mouseout', this.currentAddBtn, overOutHandler);

        if (this.addBtnMode === 'add' && addBtnForTask) {
          this.cancelBlur = false;
          this.createTaskElementOn(clickEventContent);
          this.changeBtnModeTo('delete');
          return;
        }

        if (this.addBtnMode === 'delete' && addBtnForTask) {
          this.cancelBlur = false;
          this.changeBtnModeTo('add');
          this.removeTaskElementOnDOM();
          U.removeEvent('mouseover', this.currentAddBtn, overOutHandler);
          U.removeEvent('mouseout', this.currentAddBtn, overOutHandler);
          return;
        }

        if (this.addBtnMode === 'save' && addBtnForTask) {
          this.cancelBlur = false;
          this.changeBtnModeTo('add');
          this.saveTaskElementOnDOM();
          U.removeEvent('mouseover', this.currentAddBtn, overOutHandler);
          U.removeEvent('mouseout', this.currentAddBtn, overOutHandler);
          return;
        }
        return;
      }
    };

    const inputHandler = () => {
      const targetIsTaskField = this.newTaskField;
      const hasValue = targetIsTaskField.innerText.trim();

      if (targetIsTaskField && hasValue) {
        this.changeBtnModeTo('save');
        return;
      }
      if (targetIsTaskField && !hasValue) {
        this.changeBtnModeTo('delete');
        return;
      }
    };

    const blurHandler = (e) => {
      if (e.target === this.newTaskField && this.cancelBlur) {
        U.removeEvent('mouseover', this.currentAddBtn, overOutHandler);
        U.removeEvent('mouseout', this.currentAddBtn, overOutHandler);
        if (this.addBtnMode === 'delete' && this.addBtnFor === 'addTask') {
          this.removeTaskElementOnDOM();
          this.changeBtnModeTo('add');
        }
        if (this.addBtnMode === 'save' && this.addBtnFor === 'addTask') {
          this.saveTaskElementOnDOM();
          this.changeBtnModeTo('add');
        }
      }
    };

    this.boards.forEach((todoBoard) => {
      U.addEvent('click', todoBoard, clickHandler);
      U.addEvent('input', todoBoard, inputHandler);
      U.addEvent('focusout', todoBoard, blurHandler);
    });
  }

  removeTaskElementOnDOM() {
    if (!this.newTaskField.innerText.trim()) {
      this.newTaskField.parentNode.remove();
    }
  }

  saveTaskElementOnDOM() {
    this.newTaskField.innerText = this.newTaskField.innerText.trim();
    this.newTaskField.setAttribute('contenteditable', false);
  }

  changeBtnModeTo(mode) {
    this.addBtnMode = mode;
    if (mode === 'add') {
      this.currentAddBtn.innerText = '+' + mode;
      this.currentAddBtn.style.removeProperty('color');
    } else if (mode === 'save') {
      this.currentAddBtn.innerText = '✓ ' + mode;
      this.currentAddBtn.style.color = '#009f0b';
    } else if (mode === 'delete') {
      this.currentAddBtn.innerText = '✗ ' + mode;
      this.currentAddBtn.style.color = 'var(--t-color-4)';
    }
  }

  init() {
    if (!this.length) {
      this.addData('todoData', this.createTodoData());
    }
    this.renderBoardsFromDb();
    this.bindListeners();
    this.addItem('todo', 'value');
  }
}
