const icons = {
  todo: './src/img/todo.svg',
  timers: './src/img/timers.svg',
  weather: './src/img/weather.svg',
  idea: './src/img/idea.svg',
  alarm: './src/img/alarm.svg',
  pomodoro: './src/img/pomodoro.svg',
  stopwatch: './src/img/stopwatch.svg',
};

export default class NavigationView {
  constructor(navContainer, content, btnTag, activeContent, animationClass) {
    this.nav = document.querySelector(navContainer);
    this.content = document.querySelectorAll(content);
    this.activeContent = activeContent;
    this.btnTag = btnTag;
    this.animateClass = animationClass;
  }
}
