import U from '../helpers/utils';

export default class InterfaceController {
  constructor(view, navigations, model, apps, theme = 'dark') {
    this.view = view;
    this.model = model;
    this.apps = apps;
    this.navigations = navigations;

    this.navigationBtnsContainers = {};
    this.defaultTheme = theme;
    this.themeSwitcher = document.querySelector('theme');

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
        this.view.switchTheme(currentTheme);
        this.themeSwitcher.querySelector('input').checked = true;
        break;
      case false:
        this.model.addThemeToDB(this.defaultTheme);
        this.view.switchTheme(this.defaultTheme);
        break;
    }

    this.apps['task']?.bindListeners();

    this.view.switchContent('main', 'task');
    this.view.switchContent('timers', 'alarm');
    this.view.activeBtn('main', 'task');
    this.view.activeBtn('timers', 'alarm');
  }

  handleClick({ target }) {
    const navBtn = target.closest('[data-nav-btn]');
    if (navBtn) {
      const navTab = target.closest('[data-nav-btns]');
      const page = navTab.dataset.navBtns;
      const content = navBtn.dataset.navBtn;
      this.view.switchContent(page, content);
      this.view.activeBtn(page, content);
    }
  }

  handleChange({ target }) {
    let themeName;
    if (target.checked) {
      themeName = 'dark';
      target.checked = false;
    } else {
      themeName = 'light';
    }

    this.model.addThemeToDB(themeName);
    this.view.switchTheme();
  }
}
