export default class InterfaceView {
  constructor() {
    this.navigationBtnsContainer = {};
    this.interfacePages = {};
    this.navigationButtons = {};
    this.defaultPages = {};

    // this.switchContent('main', 'todo');
  }

  assignDOMElements(navigations) {
    for (const navType in navigations) {
      if (navigations.hasOwnProperty(navType)) {
        const navigation = navigations[navType];
        const { navigationBtnsContainer, interfacePages, navigationButtons, interfaceDefaultPage } = navigation;

        this.navigationBtnsContainer[navType] = document.querySelector(navigationBtnsContainer);
        this.interfacePages[navType] = document.querySelectorAll(interfacePages);
        this.navigationButtons[navType] = document.querySelectorAll(navigationButtons);
        this.defaultPages[navType] = interfaceDefaultPage;
      }
    }
  }

  switchContent(interfacePage, targetContent, defaultPages = this.defaultPages) {
    const currentNavigationPageName = `${interfacePage}Content`;
    if (interfacePage && targetContent) {
    }
    this.interfacePages[interfacePage].forEach((page) => {
      page.classList.toggle('hide', page.dataset[currentNavigationPageName] !== targetContent);
    });
  }
}
