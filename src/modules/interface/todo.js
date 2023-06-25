import Data from '../db/data';
import U from '../helpers/utils';

export default class Todo extends Data {
  constructor(wrapper) {
    super();
    this.todoWrapper = document.querySelector(wrapper);
    this.boards = Array.from(this.todoWrapper.children);
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
        if (U.isTarget(e, '.task-block_emoji'))
          console.log(U.isTarget(e, '.task-block_emoji'));
      });
      header.addEventListener('contextmenu', (e) => {
        console.log(e);
      });
    });
  }

  init() {
    if (!this.length) {
      this.addData('todoData', this.createTodoData());
    }
    this.renderBoardsFromDb();
    this.bindListeners();
  }
}
