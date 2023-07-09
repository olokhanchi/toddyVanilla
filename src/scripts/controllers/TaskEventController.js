import U from "../helpers/utils";

export default class TaskEventController {
  constructor(view, controller) {
    this.view = view;
    this.controller = controller;
    this.addBtnMode = "add";
    this.addBtnRole = "addTask"; // or saveBlockName
    this.addBtnClicked = false;

    this.handleOverOutEvent = this.handleOverOut.bind(this);

    this.bindListeners();
    // this.removeListeners();
  }

  handleClick(e) {
    const targetIsAddBtn = e.target.hasAttribute("data-btn-add");
    const addBtnRoleNewTask = this.addBtnRole === "addTask";

    if (targetIsAddBtn && addBtnRoleNewTask) {
      const target = e.target;
      const content = target.parentNode.nextElementSibling;
      this.view.currentAddBtn = target;
      this.controller.type = target.dataset.btnType;
      this.view.currentClickedContent = content;

      U.addEvent("mouseover", target, this.handleOverOutEvent);
      U.addEvent("mouseout", target, this.handleOverOutEvent);

      switch (this.addBtnMode) {
        case "add":
          this.handleAddButton();
          break;
        case "delete":
          this.handleDeleteButton();
          break;
        case "save":
          this.handleSaveButton();
          break;

        default:
          console.log("Mode not found");
          break;
      }
    }
  }

  handleOverOut() {
    console.log("over");
    this.addBtnClicked = !this.addBtnClicked;
  }

  handleInput(e) {
    this.addBtnMode = "add";
    this.view.currentTaskField = e.target;
    if (e.target.textContent.trim()) {
      this.addBtnMode = "save";
      this.view.changeBtnMode("save");
    } else {
      this.addBtnMode = "delete";
      this.view.changeBtnMode("delete");
    }
  }

  handleBlur(e) {
    console.log(this.addBtnMode);
    const targetIsTaskField = e.target.hasAttribute("contenteditable");
    if (targetIsTaskField && this.addBtnClicked) {
      this.addBtnMode = "add";

      U.removeEvent(
        "mouseover",
        this.view.currentAddBtn,
        this.handleOverOutEvent
      );
      U.removeEvent(
        "mouseout",
        this.view.currentAddBtn,
        this.handleOverOutEvent
      );

      if (e.target.textContent.trim()) {
        this.handleSaveButton();
      } else {
        this.handleDeleteButton();
      }
    }
  }

  handleAddButton() {
    this.controller.addBtnClicked();
    this.addBtnMode = "delete";
  }

  handleDeleteButton() {
    this.controller.deleteBtnClicked();
    this.addBtnMode = "add";
  }

  handleSaveButton() {
    this.controller.saveBtnClicked();
    this.addBtnMode = "add";
  }

  bindListeners() {
    U.addEvent("click", this.view.wrapper, (e) => this.handleClick(e));
    U.addEvent("input", this.view.wrapper, (e) => this.handleInput(e));
    U.addEvent("focusout", this.view.wrapper, (e) => this.handleBlur(e));
  }

  removeListeners() {
    U.removeEvent("click", this.view.wrapper, () => this.handleClick());
    U.removeEvent("input", this.view.wrapper, () => this.handleInput());
    U.removeEvent("focusout", this.view.wrapper, () => this.handleBlur());
  }
}
