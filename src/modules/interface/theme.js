export default class ThemeSwitcher {
  constructor(root, switcher, themeName, defaultTheme = 'light') {
    this.root = root;
    this.switcher = document.querySelector(switcher);
    this.themeName = themeName;
    this.default = defaultTheme;
  }

  themeToggle() {
    if (this.default === 'dark') {
      this.root.classList.add('dark');
      this.switcher.querySelector('input').setAttribute('checked', true);
    }
    this.switcher.addEventListener('change', () => {
      this.root.classList.toggle(this.themeName);
    });
  }

  init() {
    this.themeToggle();
  }
}
