class Clock {
  constructor() {
    this.hands = {};
    this.angles = {};
  }
  init() {
    this.clock = document.querySelector(".clock");
    if (this.clock) {
      this.addFace();
      this.addHands();
      this.addDigital();
      this.run();
    }
  }
  addFace() {
    for (let i = 1; i <= 12; i++) {
      const faceNumber = document.createElement(`div`);
      faceNumber.classList.add("face-number");
      faceNumber.dataset.number = i;
      this.clock.appendChild(faceNumber);
    }
  }
  addHands() {
    for (const hand of ["hours", "minutes", "seconds"]) {
      this.hands[hand] = document.createElement(`div`);
      this.hands[hand].classList.add(hand);
      this.clock.appendChild(this.hands[hand]);
    }
  }
  addDigital() {
    this.digitalClock = document.createElement(`div`);
    this.digitalClock.classList.add("digital-clock");
    this.clock.appendChild(this.digitalClock);
  }
  run() {
    // window.setInterval(this.setTime.bind(this), 100);
    window.requestAnimationFrame(this.setTime.bind(this));
  }
  getAngles(currentTime) {
    const angles = {};

    const beginningOfMinute = new Date(currentTime.getTime());
    beginningOfMinute.setMilliseconds(0);
    beginningOfMinute.setSeconds(0);
    const timeSinceBeginningOfMinute = currentTime - beginningOfMinute;
    angles.seconds = ((6 * timeSinceBeginningOfMinute) / 1000).toFixed(1);

    const beginningOfHour = new Date(beginningOfMinute.getTime());
    beginningOfHour.setMinutes(0);
    const timeSinceBeginningOfHour = currentTime - beginningOfHour;
    angles.minutes = (timeSinceBeginningOfHour / 10000).toFixed(1);

    const beginningOfDay = new Date(beginningOfHour.getTime());
    beginningOfDay.setHours(0);
    const timeSinceBeginningOfDay = currentTime - beginningOfDay;
    angles.hours = (timeSinceBeginningOfDay / 120000).toFixed(1);

    return angles;
  }
  setTime() {
    const currentTime = new Date();
    const timeString = currentTime
      .toLocaleTimeString()
      .replace(/(.*)(:\d{2} )|(.*)$/, "$1 $3");

    if (this.timeString !== timeString) {
      this.timeString = timeString;
      this.digitalClock.innerHTML = timeString;
    }

    const angles = this.getAngles(currentTime);
    // if (this.angles.seconds !== angles.seconds) {
    //   this.angles.seconds = angles.seconds;
    //   this.hands.seconds.style.transform = `rotate(${angles.seconds}deg)`;
    // }
    for (const hand of ["hours", "minutes", "seconds"]) {
      if (this.angles[hand] !== angles[hand]) {
        this.angles[hand] = angles[hand];
        this.hands[hand].style.transform = `rotate(${angles[hand]}deg)`;
      }
    }

    window.requestAnimationFrame(this.setTime.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Clock().init();
});
