export default class InterfaceController {
  constructor(view, navigations, model, apps) {
    this.view = view;
    this.model = model;
    this.apps = apps;
    this.navigations = navigations;

    this.init();
    this.apps['task'].bindListeners();
    console.log(this.view.navigationBtnsContainer);
  }

  init() {
    this.view.assignDOMElements(this.navigations);
  }
}
