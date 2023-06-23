import Tabs from './UI/tabs';
import ThemeSwitcher from './UI/theme';

window.addEventListener('DOMContentLoaded', () => {
  const timerTabs = new Tabs(
    document.querySelector('.timer-nav_btns'),
    document.querySelectorAll('.timer-wrapper .timer-content')
  );
  timerTabs.init();

  const theme = new ThemeSwitcher(document.documentElement, '.theme', 'dark');
  theme.init();
});
