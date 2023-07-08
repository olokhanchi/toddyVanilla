import U from '../helpers/utils';

export default class TaskView {
  defaultTaskTitle = 'Right click to edit or remove';

  constructor() {
    this.todoBlock = document.querySelector('[data-type="todo"]');
    this.doingBlock = document.querySelector('[data-type="doing"]');
    this.doneBlock = document.querySelector('[data-type="done"]');
    this.todo = this.todoBlock?.querySelector('[data-content]');
    this.doing = this.doingBlock?.querySelector('[data-content]');
    this.done = this.doneBlock?.querySelector('[data-content]');
    this.taskTemplate = U.taskTemplate('', '', 'New task', true);
    this.currentAddBtn = null;
    this.currentClickedContent = null;
    this.currentTaskField = null;
    this.taskId = null;
    this.taskValue = null;
  }

  renderDefaultTasks(type, tasks) {
    const taskItemsArray = [];
    for (const task of tasks) {
      taskItemsArray.push(U.taskTemplate(task.id, task.description, this.defaultTaskTitle));
    }
    this[type].insertAdjacentHTML('afterbegin', taskItemsArray.join(' '));
  }

  showTaskField() {
    this.currentClickedContent.insertAdjacentHTML('afterbegin', this.taskTemplate);
    this.currentTaskField = this.currentClickedContent.querySelector('[contenteditable="true"]');
    this.currentTaskField.focus();
  }
  removeTaskField() {
    this.currentTaskField.parentNode.remove();
  }
  saveNewTaskItem() {
    this.currentTaskField.setAttribute('contenteditable', false);
    this.currentTaskField.parentNode.setAttribute('data-task-id', this.taskId);
    this.currentTaskField.innerText = this.currentTaskField.innerText.trim();
    this.taskValue = this.currentTaskField.innerText.trim();
  }

  changeBtnMode(mode) {
    switch (mode) {
      case 'add':
        this.currentAddBtn.innerText = '+' + mode;
        this.currentAddBtn.style.removeProperty('color');
        break;
      case 'delete':
        this.currentAddBtn.innerText = '✗ ' + mode;
        this.currentAddBtn.style.color = 'var(--t-color-4)';
        break;
      case 'save':
        this.currentAddBtn.innerText = '✓ ' + mode;
        this.currentAddBtn.style.color = '#009f0b';
        break;
    }
  }
  resetBtnView() {
    document.querySelectorAll('[data-btn-add]').forEach((btn) => {
      btn.innerText = '+add';
      btn.style.removeProperty('color');
    });
  }
}