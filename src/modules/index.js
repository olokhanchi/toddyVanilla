import Tabs from './UI/tabs';

window.addEventListener('DOMContentLoaded', () => {
  const timerTabs = new Tabs(
    document.querySelector('.timer-nav_btns'),
    document.querySelectorAll('.timer-wrapper .timer-content')
  );
  timerTabs.init();
});
