const body = document.querySelector('body');
const timerEl = document.querySelector('.timer');
const daysEl = document.querySelector('[data-value="days"]');
const hoursEl = document.querySelector('[data-value="hours"]');
const minsEl = document.querySelector('[data-value="mins"]');
const secsEl = document.querySelector('[data-value="secs"]');

class CountdownTimer {
  constructor({ onTick, targetDate, selector }) {
    this.selector = selector;
    this.intervalId = null;
    this.onTick = onTick;
    this.targetDate = targetDate;
  }
  
  start() {
    this.countdownTimerComposer();
    this.intervalId = setInterval(() => {
      this.countdownTimerComposer();
      }, 1000);
  }
 
  countdownTimerComposer() {
    const currentDate = Date.now();
    const targetDate = this.targetDate; 
    const deltaTime = targetDate - currentDate;
    const timerComponents = this.getTimeComponents(deltaTime); 
    this.onTick(this.selector, timerComponents);
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
  
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
};

function upgradeTimerElements(selector, { days, hours, mins, secs }) {
  timerEl.id = selector.slice(1);
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minsEl.textContent = mins;
  secsEl.textContent = secs;
};

const timer = new CountdownTimer({
  onTick: upgradeTimerElements,
  selector: '#timer-1',
  targetDate: new Date('Jun 21, 2021'),
});

timer.start();