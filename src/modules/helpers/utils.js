export default class U {
  // General
  static capitalize(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  //Todo


  static taskTemplate(id, description, title = 'Right click to edit or delete', editable = false) {
    return `
    <div class="task-item scaleX" title="${title}">
    <div data-task-id="${id}" class="task-item_text" contenteditable=${editable} spellcheck="true">
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
    element?.addEventListener(type, handler);
  }
  static removeEvent(type, element, handler) {
    element?.removeEventListener(type, handler);
    console.log(`${type} - event removed on ${element} element`);
  }
}
