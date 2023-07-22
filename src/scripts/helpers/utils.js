export default class U {
  // General
  static capitalize(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  //Todo
  static todoDataTemplate() {
    let todoData = new Map();
    todoData.set('todo', {
      name: 'todo',
      emoji: '&#x1F600',
      tasks: [{ id: '1', description: 'my first task' }],
    });
    todoData.set('doing', {
      name: 'doing',
      emoji: '&#x1F600',
      tasks: [],
    });
    todoData.set('done', {
      name: 'done',
      emoji: '&#x1F600',
      tasks: [],
    });
    return todoData;
  }

  static boardTemplate(type, emoji, taskItems) {
    return `
    <div class="task-block" data-task-block data-type="${type}">
      <div class="task-block_header">
        <div data-btn-emoji role="button" title="Click to change" class="task-block_emoji">${emoji}</div>
        <div data-input-name class="task-block_name">${type}</div>
        <button data-btn-add class="task-block_add-btn">+add</button>
      </div>
      <div data-content class="task-block_content">
      ${taskItems}
      </div>
      <div class="task-block_footer">
        <button class="task-block_delete-btn">clear all</button>
      </div>
   </div>`;
  }

  static taskTemplate(id = 'id', description, title = 'Right click to edit or delete', editable = false) {
    return `
    <div data-task-id="${id}" draggable="true" class="task-item ${editable ? 'scaleX' : ''}" title="${title}">
    <div data-task-field class="task-item_text" contenteditable="${editable}" spellcheck="true">
      ${description}
    </div>
  </div>
    `;
  }

  static findTargetUp(element, closestValue) {
    if (element.target) {
      return element.target.closest(closestValue);
    }
    return element.closest(closestValue);
  }

  static multiplePress(eventElement, firstKey, secondKey, callback) {
    let firstKeyPressed = false;

    eventElement.addEvesntListener('keydown', (event) => {
      if (event.key === firstKey.toString()) {
        firstKeyPressed = true;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
      }

      if (event.key === secondKey.toString() && firstKeyPressed) {
        callback();
      }
    });

    eventElement.addEventListener('keyup', (event) => {
      if (event.key === firstKey.toString()) {
        firstKeyPressed = false;
      }
    });
  }

  static moveCursorToEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
  }

  static addEvent(type, element, handler, capture = false) {
    element?.addEventListener(type, handler, capture);
  }

  static removeEvent(type, element, handler) {
    element?.removeEventListener(type, handler);
    // console.log(`${type} - event removed on ${element} element`);
  }
}
