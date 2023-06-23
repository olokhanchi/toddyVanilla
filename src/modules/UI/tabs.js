export default class Tabs {
  constructor(nav, content) {
    this.nav = nav;
    this.content = content;
  }

  bindBtnTriggers() {
    let btns = Array.from(this.nav.children);
    this.changeContentTo();

    this.nav.addEventListener('click', (e) => {
      const content = e.target.closest('li')?.dataset.timerBtn;

      if (content) {
        this.changeContentTo(content);

        btns.forEach((btn) => {
          btn.classList.toggle('active', btn.dataset.timerBtn === content);
        });
      }
    });
  }

  changeContentTo(content = 'alarm') {
    this.content.forEach((c) => {
      c.classList.toggle(
        'hide',
        c.getAttribute('data-timer-content') !== content
      );
    });
  }

  init() {
    this.bindBtnTriggers();
  }
}
