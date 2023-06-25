import Utils from '../helpers/utils';

export default class Navigation {
  constructor(navContainer, content, btnTag, activeContent, animationClass) {
    this.nav = document.querySelector(navContainer);
    this.content = document.querySelectorAll(content);
    this.activeContent = activeContent;
    this.btnTag = btnTag;
    this.animateClass = animationClass;
  }

  bindBtnTriggers() {
    let btns = Array.from(this.nav.children);
    this.changeContentTo();

    this.nav.addEventListener('click', (e) => {
      const content = e.target.closest(this.btnTag)?.attributes[0].value;

      if (content) {
        this.changeContentTo(content);
        document.title = Utils.capitalize(content);
        window.location.hash = content;

        btns.forEach((btn) => {
          btn.classList.toggle('active', btn.attributes[0].value === content);
        });
      }
    });
  }

  changeContentTo(content = this.activeContent) {
    this.content.forEach((c) => {
      let isActive = c.attributes[0].value !== content;
      
      c.classList.toggle('hide', isActive);
      c.classList.add(this.animateClass);
    });
  }

  init() {
    this.bindBtnTriggers();
  }
}
