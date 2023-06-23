export default class ThemeSwitcher {
  constructor(root, switcher, themeName) {
    this.root = root;
    this.switcher = document.querySelector(switcher);
    this.themeName = themeName;
  }

  themeToggle() {
    this.switcher.addEventListener('change', () => {
      this.root.classList.toggle(this.themeName);
    });
  }

  init() {
    this.themeToggle();
  }
}
