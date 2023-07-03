import U from '../helpers/utils';

export default class TaskEventController {
  constructor(view, controller) {
    this.view = view;
    this.controller = controller;
    U.addEvent('click', this.view.todo, this.clickHandler.bind(this));
    U.addEvent('click', this.view.doing, this.clickHandler.bind(this));
    U.addEvent('click', this.view.done, this.clickHandler.bind(this));
  }

  clickHandler(e) {
    const targetIsAddBtn = U.findTargetUp(e, '[data-btn-add]');

    if (targetIsAddBtn && this.controller.addBtnMission === 'newTask') {
      this.view.currentClickBlock = e.target.closest('[data-task-block]');
      console.log(e.target);
    }
  }
}
