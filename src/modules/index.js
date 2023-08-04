import Navigation from './interface/navigation';
import ThemeSwitcher from './interface/theme';

window.addEventListener('DOMContentLoaded', () => {
  //UI
  try {
    new ThemeSwitcher(document.documentElement, '.theme', 'dark', 'dark').init();
  } catch (error) {
    console.log(error);
  }
});
