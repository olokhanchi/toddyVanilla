import Data from '../db/data';
import U from '../helpers/utils';

export default class Todo extends Data {
  constructor(wrapper) {
    super();
    this.todoWrapper = document.querySelector(wrapper);
    this.boards = Array.from(this.todoWrapper.children);
    this.currentContent = null;
    this.addTaskItem = null;
    this.currentAddBtn = null;
  }

  createTodoData() {
    return [...U.todoDataTemplate()];
  }

  renderBoardsFromDb() {
    const boards = this.getData('todoData').map((boardData) => {
      const boardName = boardData[1].name;
      const boardEmoji = boardData[1].emoji;
      const boardTasks = boardData[1].tasks;

      const taskItems = boardTasks
        .map((task) => U.taskTemplate(task.id, task.description).trim())
        .join('');

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
        if (U.isTarget(e, '.task-block_add-btn')) {
          const targetBlock = e.target.closest('.task-block');
          const targetContent = targetBlock.querySelector(
            '.task-block_content'
          );
          this.currentAddBtn = targetBlock.querySelector('button');
          this.currentContent = targetContent;
          this.createTaskElement(this.currentContent);
        }
      });
    });
  }

  createTaskElement(blockContent) {
    const taskAddItemHTML = U.taskTemplate('', '', 'new task', true).trim();
    blockContent.insertAdjacentHTML('afterbegin', taskAddItemHTML);

    const taskAddItemElement = blockContent.querySelector(
      '[contenteditable="true"]'
    );
    taskAddItemElement.parentNode.classList.add('scaleX');
    taskAddItemElement.addEventListener('blur', () => {
      if (!taskAddItemElement.textContent.trim()) {
        taskAddItemElement.parentNode.remove();
        return;
      }

      taskAddItemElement.setAttribute('contenteditable', false);
    });

    taskAddItemElement.focus();
  }

  init() {
    if (!this.length) {
      this.addData('todoData', this.createTodoData());
    }
    this.renderBoardsFromDb();
    this.bindListeners();
  }
}
