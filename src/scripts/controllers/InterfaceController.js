import U from '../helpers/utils';

export default class InterfaceController {
  constructor(view, navigations, model, apps, theme) {
    this.view = view;
    this.model = model;
    this.apps = apps;
    this.navigations = navigations;

    this.navigationBtnsContainers = {};
    this.defaultTheme = theme;
    this.themeSwitcher = document.querySelector('.theme input');

    this.appFirstRun();
  }

  appFirstRun() {
    for (const navType in this.navigations) {
      if (this.navigations.hasOwnProperty(navType)) {
        const navigation = this.navigations[navType];
        const { navigationBtnsContainers, interfacePages, navigationButtons } = navigation;

        this.navigationBtnsContainers[navType] = document.querySelector(navigationBtnsContainers);
        this.view.interfacePages[navType] = document.querySelectorAll(interfacePages);
        this.view.navigationButtons[navType] = document.querySelectorAll(navigationButtons);

        U.addEvent('click', this.navigationBtnsContainers[navType], this.handleClick.bind(this));
      }
    }
    U.addEvent('change', this.themeSwitcher, this.handleChange.bind(this));

    switch (this.model.dataCheck('theme')) {
      case true:
        const currentTheme = this.model.getThemeFromDB();
        this.switchThemeAction(currentTheme);
        break;
      case false:
        this.model.addThemeToDB(this.defaultTheme);
        this.switchThemeAction(this.defaultTheme);
        break;
    }

    this.switchContentAction('main', 'task');
    this.switchContentAction('timers', 'alarm');
  }

  handleClick({ target }) {
    const navBtn = target.closest('[data-nav-btn]');
    if (navBtn) {
      const navTab = target.closest('[data-nav-btns]');
      const page = navTab.dataset.navBtns;
      const content = navBtn.dataset.navBtn;
      this.switchContentAction(page, content);
    }
  }

  handleChange({ target }) {
    const isLight = !target.checked;
    if (isLight) {
      this.switchThemeAction('light');
    } else {
      this.switchThemeAction('dark');
    }
  }

  switchThemeAction(theme) {
    this.view.switchTheme(theme);
    this.model.addThemeToDB(theme);
    this.themeSwitcher.checked = theme === 'dark' ? true : false;
  }

  switchContentAction(page, content) {
    this.view.switchContent(page, content);
    this.view.activeBtn(page, content);
    try {
      this.apps[content]?.bindListeners();
    } catch {
      console.log(`the method bindListeners() is not defined for the ${content}`);
    }
  }
}
