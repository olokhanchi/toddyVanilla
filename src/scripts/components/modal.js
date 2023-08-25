import U from '../helpers/utils';

export default class Modal {
  constructor(modal, openTrigger, content, modalHeader, onSubmit) {
    this.modal = document.querySelector(modal);
    this.modalName = this.modal?.children[0];
    this.modalContainer = this.modal?.children[1];
    this.modalContent = this.modalContainer?.children[0];
    this.closeTrigger = this.modal?.children[2];
    this.openTrigger = openTrigger;
    this.content = content;
    this.modalHeader = modalHeader || 'New modal';

    this.clickEvent = this.handleClick.bind(this);
    this.selectedValue = onSubmit;

    this.openedEarlier = false;
  }

  open() {
    this.bindListeners();
    this.modal.classList.remove('fadeOut');
    this.modal.classList.remove('hide');
    if (!this.openedEarlier) {
      this.modalName.innerHTML = this.modalHeader;
      this.modalContent.innerHTML = this.content;
      this.modal.classList.add('fadeIn');
    }
  }

  close() {
    this.modal.classList.add('fadeOut');
    this.openedEarlier = true;
    const hideTimer = setTimeout(() => {
      this.modal.classList.add('hide');
      clearTimeout(hideTimer);
    }, 300);
    this.removeListeners();
  }

  handleClick({ target }) {
    if (target === this.closeTrigger || target === this.modal) {
      this.close();
    }

    if (target.hasAttribute('data-value')) {
      this.selectedValue(target.innerText);
      this.close();
    }
  }

  bindListeners() {
    U.addEvent('click', this.modal, this.clickEvent);
  }

  removeListeners() {
    U.removeEvent('click', this.modal, this.clickEvent);
  }
}
