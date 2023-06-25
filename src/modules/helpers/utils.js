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
      tasks: [
        { id: '1', description: 'my first task' },
        { id: '2', description: 'my second task' },
      ],
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

  static taskTemplate(id, description, editable = false) {
    return `
    <div class="task-item">
    <div data-task-id=${id} class="task-item_text" contenteditable=${editable} spellcheck="true" title="Double click for edit">
      ${description}
    </div>
  </div>
    `;
  }

  static isTarget(e, closestValue) {
    return e.target.closest(closestValue);
  }
}