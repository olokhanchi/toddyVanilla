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
    console.log(`${type} - event removed on ${element} element`);
  }

  static capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static emojiModalGenerate() {
    const emojiCodes = [
      '&#128121',
      '&#128122',
      '&#128123',
      '&#128125',
      '&#128126',
      '&#128127',
      '&#128128',
      '&#128169',
      '&#128512',
      '&#128513',
      '&#128514',
      '&#128515',
      '&#128516',
      '&#128517',
      '&#128518',
      '&#128519',
      '&#128520',
      '&#128521',
      '&#128522',
      '&#128523',
      '&#128524',
      '&#128525',
      '&#128526',
      '&#128527',
      '&#128528',
      '&#128529',
      '&#128530',
      '&#128531',
      '&#128532',
      '&#128533',
      '&#128534',
      '&#128535',
      '&#128536',
      '&#128537',
      '&#128538',
      '&#128539',
      '&#128540',
      '&#128541',
      '&#128542',
      '&#128543',
      '&#128544',
      '&#128545',
      '&#128546',
      '&#128547',
      '&#128548',
      '&#128549',
      '&#128550',
      '&#128551',
      '&#128552',
      '&#128553',
      '&#128554',
      '&#128555',
      '&#128556',
      '&#128557',
      '&#128558',
      '&#128559',
      '&#128560',
      '&#128561',
      '&#128562',
      '&#128563',
      '&#128564',
      '&#128565',
      '&#128566',
      '&#128567',
      '&#128568',
      '&#128569',
      '&#128570',
      '&#128571',
      '&#128572',
      '&#128573',
      '&#128574',
      '&#128575',
      '&#128576',
      '&#128577',
      '&#128578',
      '&#128579',
      '&#128580',
      '&#128584',
      '&#128585',
      '&#128586',
      '&#129296',
      '&#129297',
      '&#129298',
      '&#129299',
      '&#129300',
      '&#129301',
      '&#129302',
      '&#129303',
      '&#129312',
      '&#129313',
      '&#129314',
      '&#129315',
      '&#129316',
      '&#129317',
      '&#129319',
      '&#129320',
      '&#129321',
      '&#129322',
      '&#129323',
      '&#129324',
      '&#129325',
      '&#129326',
      '&#129327',
      '&#129392',
      '&#129395',
      '&#129396',
      '&#129397',
      '&#129398',
      '&#129402',
      '&#129488',
    ];

    const emojis = [];

    for (let i = 0; i < emojiCodes.length; i++) {
      const emojiCode = emojiCodes[i];
      const emojiElement = `<div class="emoji">${emojiCode}</div>`;
      emojis.push(emojiElement);
    }

    return emojis.join('');
  }
}
