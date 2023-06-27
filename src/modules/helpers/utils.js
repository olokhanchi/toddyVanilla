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
    <div class="task-block" data-type="${type}">
      <div class="task-block_header">
        <div data-btn-emoji class="task-block_emoji">${emoji}</div>
        <div data-block-name class="task-block_name">${type}</div>
        <button class="task-block_add-btn">+add</button>
      </div>
      <div class="task-block_content">
      ${taskItems}
      </div>
      <div class="task-block_footer">
        <button class="task-block_delete-btn">clear all</button>
      </div>
   </div>`;
  }

  static taskTemplate(id, description, title = 'Right click to edit or delete', editable = false) {
    return `
    <div class="task-item scaleX">
    <div data-task-id="${id}" class="task-item_text" contenteditable=${editable} spellcheck="true" title="${title}">
      ${description}
    </div>
  </div>
    `;
  }

  static findTargetUp(e, closestValue) {
    return e.target.closest(closestValue);
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

  static addEvent(type, element, handler) {
    element.addEventListener(type, handler);
  }
  static removeEvent(type, element, handler) {
    element.removeEventListener(type, handler);
  }

}
