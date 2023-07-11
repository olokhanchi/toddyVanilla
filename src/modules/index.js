import Navigation from './interface/navigation';
import ThemeSwitcher from './interface/theme';

window.addEventListener('DOMContentLoaded', () => {
  //UI
  try {
    new ThemeSwitcher(document.documentElement, '.theme', 'dark', 'dark').init();
    new Navigation('[data-nav-btns="main"]', '[data-main-content]', 'li', 'todo', 'fadeIn').init();
    new Navigation('[data-nav-btns="timers"]', '[data-timer-content]', 'li', 'alarm', 'fadeIn').init();
  } catch (error) {
    console.log(error);
  }

});
