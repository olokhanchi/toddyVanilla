import Data from '../db/data';
import U from '../helpers/utils';

export default class Todo extends Data {
  constructor(wrapper) {
    super();
    this.todoWrapper = document.querySelector(wrapper);
    this.currentAddBtn;
    this.currentAddBtnMode = 'add';
    this.currentTaskItemInput;
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

        if (addBtnTarget && this.currentAddBtnMode === 'save') {
        }

        if (addBtnTarget && this.currentAddBtnMode === 'add') {
          const currentBlock = U.findTargetUp(e, '.task-block');
          const currentContent = currentBlock.querySelector('.task-block_content');
          this.currentContent = currentContent;
          this.currentAddBtnMode = 'save';
          this.currentAddBtn.textContent = '✓save';
          this.createTaskElement();
        }
      });
    });
  }

  createTaskElement() {
    const taskAddItemHTML = U.taskTemplate('', '', 'new task', true).trim();
    this.currentContent.insertAdjacentHTML('afterbegin', taskAddItemHTML);

    const taskAddItemElement = this.currentContent.querySelector('[contenteditable="true"]');
    taskAddItemElement.focus();

    function blurHandler() {
      if (this.currentAddBtnMode === 'save') {
        return;
      }
      if (!taskAddItemElement.innerText.trim()) {
        this.currentAddBtnMode = 'add';
        this.currentAddBtn.textContent = '+add';
        taskAddItemElement.parentNode.remove();
        U.removeEvent('blur', taskAddItemElement, blurHandler.bind(this));
      }
      taskAddItemElement.setAttribute('contenteditable', false);
    }
    U.addEvent('blur', taskAddItemElement, blurHandler.bind(this));

    // if (!taskAddItemElement.innerText.trim()) {
    //   taskAddItemElement.parentNode.remove();
    // }

    // taskAddItemElement.parentNode.classList.add('scaleX');
    // taskAddItemElement.addEventListener('blur', () => {
    //   this.currentAddBtnMode = 'add';
    //   this.currentAddBtn.textContent = '+add';
    //   if (!taskAddItemElement.textContent.trim() && this.currentAddBtnMode !== 'add') {
    //     taskAddItemElement.parentNode.remove();
    //     return;
    //   }
    // });
  }

  init() {
    if (!this.length) {
      this.addData('todoData', this.createTodoData());
    }
    this.renderBoardsFromDb();
    this.bindListeners();
  }
}
