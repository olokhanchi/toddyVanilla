export default class U {
  static taskTemplate(id = 'id', description, title = 'Right click to edit or delete', editable = false) {
    return `
    <div data-task-id="${id}" draggable="true" class="task-item ${editable ? 'scaleX' : ''}" title="${title}">
      <div data-task-field class="task-item_text" contenteditable="${editable}" spellcheck="true">
       ${description}
      </div>
    </div>
    `;
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
    if (element) {
      element.addEventListener(type, handler, capture);
    } else {
      document.addEventListener(type, handler);
    }
  }

  static removeEvent(type, element, handler) {
    if (element) {
      element.removeEventListener(type, handler);
    } else {
      document.removeEventListener(type, handler);
    }
    // console.log(`${type} - event removed on ${element} element`);
  }
}
