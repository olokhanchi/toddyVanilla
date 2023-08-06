export default class InterfaceView {
  constructor() {
    this.interfacePages = {};
    this.navigationButtons = {};
    this.root = document.documentElement;
  }

  switchContent(interfacePage, targetContent) {
    const currentNavigationPageName = `${interfacePage}Content`;
    this.interfacePages[interfacePage].forEach((page) => {
      page.classList.toggle('hide', page.dataset[currentNavigationPageName] !== targetContent);
      page.classList.toggle('fadeIn', page.dataset[currentNavigationPageName] === targetContent);
    });
  }

  activeBtn(navTab, clickedBtn) {
    const navBtns = Array.from(this.navigationButtons[navTab]);
    navBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.navBtn === clickedBtn);
    });
  }

  switchTheme(theme = 'dark') {
    this.root.classList.toggle(theme);
  }
}
