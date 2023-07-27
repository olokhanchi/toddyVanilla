import U from '../helpers/utils';

export default class TaskView {
  defaultTaskTitle = 'Double click to edit';

  constructor() {
    this.wrapper = document.querySelector('[data-todo-wrapper]');
    this.todoBlock = document.querySelector('[data-type="todo"]');
    this.doingBlock = document.querySelector('[data-type="doing"]');
    this.doneBlock = document.querySelector('[data-type="done"]');
    this.todo = this.todoBlock?.querySelector('[data-content]');
    this.doing = this.doingBlock?.querySelector('[data-content]');
    this.done = this.doneBlock?.querySelector('[data-content]');

    this.taskTemplate = U.taskTemplate('', '', 'New task', true);
    this.addBtn = null;
    this.taskField = null;
    this.taskId = null;
    this.taskValue = null;
    this.blockNameField = null;
  }

  renderDefaultTasks(type, tasks) {
    const taskItemsArray = [];
    for (const task of tasks) {
      taskItemsArray.push(U.taskTemplate(task.id, task.description, this.defaultTaskTitle));
    }
    this[type].insertAdjacentHTML('afterbegin', taskItemsArray.join(''));
  }

  renderDefaultHeaders(taskType, headerProp) {
    const $ = this[taskType + 'Block'];
    const emoji = $.querySelector('[data-btn-emoji]');
    const name = $.querySelector('[data-block-name]');
    emoji.innerText = headerProp.emoji;
    name.innerText = headerProp.name;
  }

  showTaskField(contentType) {
    this[contentType].insertAdjacentHTML('afterbegin', this.taskTemplate);
    this.taskField = this[contentType].querySelector('[contenteditable="true"]');
    this.taskField.focus();
  }

  deleteTaskField() {
    this.taskField.parentNode.remove();
  }

  resetBtnView() {
    document.querySelectorAll('[data-btn-add]').forEach((btn) => {
      btn.innerText = '+add';
      btn.style.removeProperty('color');
    });
  }

  saveTaskItem() {
    this.taskField.setAttribute('contenteditable', false);
    this.taskField.parentNode.setAttribute('data-task-id', this.taskId);
    this.taskField.parentNode.classList.remove('scaleX');
    this.taskValue = this.taskField.innerText;
  }

  taskItemEdit() {
    this.taskField.setAttribute('contenteditable', true);
    this.taskField.parentNode.setAttribute('draggable', false);
    U.moveCursorToEnd(this.taskField);
  }

  taskItemCancelEdit() {
    this.taskField.setAttribute('contenteditable', false);
    this.taskField.parentNode.setAttribute('draggable', true);
  }

  blockNameEdit() {
    this.blockNameField.setAttribute('contenteditable', true);
    this.blockNameField.setAttribute('title', 'Block name');
    U.moveCursorToEnd(this.blockNameField);
  }

  blockNameSave() {
    this.blockNameField.setAttribute('title', 'Double click to edit');
    this.blockNameField.setAttribute('contenteditable', false);
  }

  clearAllTasks(type) {
    this[type].innerHTML = '';
  }

  changeBtnMode(mode) {
    switch (mode) {
      case 'add':
        this.addBtn.innerText = '+' + mode;
        this.addBtn.style.removeProperty('color');
        break;
      case 'delete':
        this.addBtn.innerText = '✗ ' + mode;
        this.addBtn.style.color = 'var(--t-color-4)';
        break;
      case 'save':
        this.addBtn.innerText = '✓ ' + mode;
        this.addBtn.style.color = '#009f0b';
        break;
      case 'cancel':
        this.addBtn.innerText = mode;
        this.addBtn.style.color = 'var(--t-color-3)';
        break;
    }
  }
}
