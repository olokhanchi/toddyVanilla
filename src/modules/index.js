import Navigation from './interface/navigation';
import ThemeSwitcher from './interface/theme';
import Todo from './interface/todo';

window.addEventListener('DOMContentLoaded', () => {
  //UI
  try {
    new ThemeSwitcher(document.documentElement, '.theme', 'dark').init();
    new Navigation(
      '[data-nav-btns="main"]',
      '[data-main-content]',
      'li',
      'todo',
      'fadeIn'
    ).init();

    new Navigation(
      '[data-nav-btns="timers"]',
      '[data-timer-content]',
      'li',
      'alarm',
      'fadeIn'
    ).init();
  } catch (error) {
    console.log(error);
  }
  //TODO
  new Todo('.task-wrapper').init();
});
