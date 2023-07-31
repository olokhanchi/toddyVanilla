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

    this.todoAddBtn = this.todoBlock?.querySelector('[data-btn-add]');
    this.doingAddBtn = this.doingBlock?.querySelector('[data-btn-add]');
    this.doneAddBtn = this.doneBlock?.querySelector('[data-btn-add]');

    this.taskTemplate = U.taskTemplate('', '', 'New task', true);
    this.addBtn = null;
    this.taskField = null;
    this.taskId = null;
    this.taskValue = null;
    this.blockNameField = null;

    // item-delete-mode
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

  resetBtnView(type) {
    const btn = this[type + 'AddBtn'];
    btn.innerText = '+add';
    btn.style.removeProperty('color');
  }

  saveTaskItem() {
    this.taskField.setAttribute('contenteditable', false);
    this.taskField.parentNode.setAttribute('data-task-id', this.taskId);
    this.taskField.parentNode.setAttribute('title', this.defaultTaskTitle);
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

  toggleTaskDeleteMode() {
    this.wrapper.classList.toggle('item-delete-mode');
  }

  changeBtnMode(mode, type) {
    const btn = this[type + 'AddBtn'];
    switch (mode) {
      case 'add':
        btn.textContent = '+' + mode;
        btn.style.removeProperty('color');
        break;
      case 'delete':
        btn.innerText = '✗ ' + mode;
        btn.style.color = 'var(--t-color-4)';
        break;
      case 'save':
        btn.innerText = '✓ ' + mode;
        btn.style.color = '#009f0b';
        break;
      case 'cancel':
        btn.innerText = mode;
        btn.style.color = 'var(--t-color-3)';
        break;
    }
  }
}
