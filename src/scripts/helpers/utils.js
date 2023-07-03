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

  static taskTemplate(id, description, title = 'Right click to edit or delete', editable = false) {
    return `
    <div class="task-item scaleX" title="${title}">
    <div data-task-id="${id}" class="task-item_text" contenteditable=${editable} spellcheck="true">
      ${description}
    </div>
  </div>
    `;
  }

  static popup(action) {
    if (action === 'create') {
      document.body.insertAdjacentHTML(
        'beforeend',
        `
      <div class="popup">
      <div class="popup-content">
        <div class="emoji">&#x1F600;</div>
        <div class="emoji">&#x1F601;</div>
        <div class="emoji">&#x1F602;</div>
        <div class="emoji">&#x1F603;</div>
        <div class="emoji">&#x1F604;</div>
        <div class="emoji">&#x1F605;</div>
        <div class="emoji">&#x1F606;</div>
        <div class="emoji">&#x1F607;</div>
        <div class="emoji">&#x1F608;</div>
        <div class="emoji">&#x1F609;</div>
        <div class="emoji">&#x1F60A;</div>
        <div class="emoji">&#x1F60B;</div>
        <div class="emoji">&#x1F60C;</div>
        <div class="emoji">&#x1F60D;</div>
        <div class="emoji">&#x1F60E;</div>
        <div class="emoji">&#x1F60F;</div>
        <div class="emoji">&#x1F610;</div>
        <div class="emoji">&#x1F611;</div>
        <div class="emoji">&#x1F612;</div>
        <div class="emoji">&#x1F613;</div>
        <div class="emoji">&#x1F614;</div>
        <div class="emoji">&#x1F615;</div>
        <div class="emoji">&#x1F616;</div>
        <div class="emoji">&#x1F617;</div>
        <div class="emoji">&#x1F618;</div>
        <div class="emoji">&#x1F619;</div>
        <div class="emoji">&#x1F61A;</div>
        <div class="emoji">&#x1F61B;</div>
        <div class="emoji">&#x1F61C;</div>
        <div class="emoji">&#x1F61D;</div>
        <div class="emoji">&#x1F61E;</div>
        <div class="emoji">&#x1F61F;</div>
        <div class="emoji">&#x1F620;</div>
        <div class="emoji">&#x1F621;</div>
        <div class="emoji">&#x1F622;</div>
        <div class="emoji">&#x1F623;</div>
        <div class="emoji">&#x1F624;</div>
        <div class="emoji">&#x1F625;</div>
        <div class="emoji">&#x1F626;</div>
        <div class="emoji">&#x1F627;</div>
        <div class="emoji">&#x1F628;</div>
        <div class="emoji">&#x1F629;</div>
        <div class="emoji">&#x1F62A;</div>
        <div class="emoji">&#x1F62B;</div>
        <div class="emoji">&#x1F62C;</div>
        <div class="emoji">&#x1F62D;</div>
        <div class="emoji">&#x1F62E;</div>
        <div class="emoji">&#x1F62F;</div>
        <div class="emoji">&#x1F630;</div>
        <div class="emoji">&#x1F631;</div>
        <div class="emoji">&#x1F632;</div>
        <div class="emoji">&#x1F633;</div>
        <div class="emoji">&#x1F634;</div>
        <div class="emoji">&#x1F635;</div>
        <div class="emoji">&#x1F636;</div>
        <div class="emoji">&#x1F637;</div>
        <div class="emoji">&#x1F638;</div>
        <div class="emoji">&#x1F639;</div>
        <div class="emoji">&#x1F63A;</div>
        <div class="emoji">&#x1F63B;</div>
        <div class="emoji">&#x1F63C;</div>
        <div class="emoji">&#x1F63D;</div>
        <div class="emoji">&#x1F63E;</div>
        <div class="emoji">&#x1F63F;</div>
        <div class="emoji">&#x1F640;</div>
        <div class="emoji">&#x1F641;</div>
        <div class="emoji">&#x1F642;</div>
        <div class="emoji">&#x1F643;</div>
        <div class="emoji">&#x1F644;</div>
        <div class="emoji">&#x1F645;</div>
        <div class="emoji">&#x1F646;</div>
        <div class="emoji">&#x1F647;</div>
        <div class="emoji">&#x1F648;</div>
        <div class="emoji">&#x1F649;</div>
        <div class="emoji">&#x1F64A;</div>
        <div class="emoji">&#x1F64B;</div>
        <div class="emoji">&#x1F64C;</div>
        <div class="emoji">&#x1F64D;</div>
        <div class="emoji">&#x1F64E;</div>
        <div class="emoji">&#x1F64F;</div>
      </div>
    </div`
      );
    } else if (action === 'destroy') {
      document.querySelector('.popup').remove();
    }
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
    element?.addEventListener(type, handler);
  }
  static removeEvent(type, element, handler) {
    element?.removeEventListener(type, handler);
    console.log(`${type} - event removed on ${element} element`);
  }
}
