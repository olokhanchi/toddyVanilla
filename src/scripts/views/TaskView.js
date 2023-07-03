import U from '../helpers/utils';

export default class TaskView {
  defaultTaskTitle = 'Right click to edit or remove';
  constructor() {
    this.todo = document.querySelector('[data-type="todo"]');
    this.doing = document.querySelector('[data-type="doing"]');
    this.done = document.querySelector('[data-type="done"]');
    this.currentClickBlock = null;
  }

  renderTasks(type, tasks) {
    const taskBlockContent = this[type].querySelector('[data-content]');
    let tasksHTMLArray = [];
    tasks.forEach((task) => {
      tasksHTMLArray.push(U.taskTemplate(task.id, task.description, this.defaultTaskTitle).trim());
    });

    taskBlockContent.insertAdjacentHTML('afterbegin', tasksHTMLArray.join());
  }

  
}
