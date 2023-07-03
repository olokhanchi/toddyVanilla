import Data from '../db/data';
import U from '../helpers/utils';

export default class Todo extends Data {
  constructor(wrapper) {
    super();
    this.todoWrapper = document.querySelector(wrapper);
    this.currentAddBtn = null;
    this.addBtnFor = 'task'; // block name edit
    this.currentAddBtnMode = 'add';
    this.currentContent = null;
    this.taskAddItemField = null;
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

  bindListeners() {
    const wrapper = this.todoWrapper;
    const taskBoardHeader = wrapper.querySelectorAll('.task-block_header');
    const taskBoardFooter = wrapper.querySelectorAll('.task-block_footer');
    const taskBoardContent = wrapper.querySelectorAll('.task-block_content');

    taskBoardHeader.forEach((header) => {
      header.addEventListener('click', (e) => {
        const addBtnTarget = U.findTargetUp(e, '.task-block_add-btn');
        this.currentAddBtn = addBtnTarget;

        if (addBtnTarget) {
          const currentBlock = U.findTargetUp(e, '.task-block');
          const currentContent = currentBlock.querySelector('.task-block_content');
          this.currentContent = currentContent;

          if (this.addBtnFor === 'task' && this.currentAddBtnMode === 'add') {
            this.changeBtnModeTo('delete');
            this.createTaskElement();
          } else if (this.currentAddBtnMode === 'save') {
            this.taskAddItemField.setAttribute('contenteditable', false);
            this.changeBtnModeTo('add');
          } else if (this.currentAddBtnMode === 'delete') {
            this.taskAddItemField.parentNode.remove();
            this.changeBtnModeTo('add');
          } else {
            return;
          }
        }
      });
    });
  }

  createTaskElement() {
    const taskAddItemHTML = U.taskTemplate('', '', 'new task', true).trim();
    this.currentContent.insertAdjacentHTML('afterbegin', taskAddItemHTML);

    const taskAddItemField = this.currentContent.querySelector('[contenteditable="true"]');
    this.taskAddItemField = taskAddItemField;

    taskAddItemField.focus();

    const blurHandler = (e) => {
      if (!taskAddItemField.innerText.trim() && this.currentAddBtnMode === 'delete') {
        e.preventDefault();
        this.changeBtnModeTo('add');
        taskAddItemField.parentNode.remove();
        U.removeEvent('blur', taskAddItemField, blurHandler.bind(this));

        // U.removeEvent('input', taskAddItemField, inputHandler.bind(this));
      } else if (this.currentAddBtnMode === 'save' || this.currentAddBtnMode === 'delete') {
        return;
      }
      this.changeBtnModeTo('add');

      taskAddItemField.setAttribute('contenteditable', false);
      taskAddItemField.parentNode.setAttribute('title', 'Right click to edit or delete');
    };

    const inputHandler = () => {
      if (taskAddItemField.innerText.trim()) {
        this.changeBtnModeTo('save');
      } else {
        this.changeBtnModeTo('delete');
      }
    };
    const pasteHandler = (e) => {
      function stripFormatting(text) {
        const strippedText = text.replace(/<[^>]+>/g, '');
        const cleanText = strippedText.trim();
        return cleanText;
      }
      e.preventDefault();
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData('text/plain');
      const strippedText = stripFormatting(pastedText);
      document.execCommand('insertHTML', false, strippedText);
      U.removeEvent('paste', taskAddItemField, pasteHandler.bind(this));
    };

    U.addEvent('blur', taskAddItemField, blurHandler.bind(this));
    U.addEvent('input', taskAddItemField, inputHandler.bind(this));
    U.addEvent('paste', taskAddItemField, pasteHandler.bind(this));

    taskAddItemField.addEventListener('blur', blurHandler);
  }

  changeBtnModeTo(mode) {
    this.currentAddBtnMode = mode;
    if (mode === 'add') {
      const btns = this.todoWrapper.querySelectorAll('.task-block_add-btn');
      btns.forEach((btn) => {
        btn.style.removeProperty('color');
        btn.textContent = '+' + mode;
      });
      this.currentAddBtn.textContent = '+' + mode;
      this.currentAddBtn.style.removeProperty('color');
    } else if (mode === 'save') {
      this.currentAddBtn.textContent = '✓ ' + mode;
      this.currentAddBtn.style.color = '#009f0b';
    } else if (mode === 'delete') {
      this.currentAddBtn.textContent = '✗ ' + mode;
      this.currentAddBtn.style.color = 'var(--t-color-4)';
    }
  }

  init() {
    if (!this.length) {
      this.addData('todoData', this.createTodoData());
    }
    this.renderBoardsFromDb();
    this.bindListeners();
  }
}
