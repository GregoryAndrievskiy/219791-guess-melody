const animate = {
  getAnimation: (step, stepDuration, steps) => ({
    step, stepDuration, steps
  }),
  animate: (animation, callback, callbackEnd) => {
    const interval = setInterval(() => {
      const nextStep = animation.step + 1;
      if (nextStep <= animation.steps) {
        animation = animate.getAnimation(nextStep, animation.stepDuration, animation.steps);
        callback(animation);
      } else {
        stopFn();
        if (typeof callbackEnd === `function`) {
          callbackEnd();
        }
      }
    }, animation.stepDuration);
    const stopFn = () => clearInterval(interval);
    return stopFn;
  }
};

const redrawCircle = (circle, radius, animation) => {
  const length = 2 * Math.PI * radius;
  const stepLength = length / animation.steps;
  const lengthToClear = stepLength * animation.step;
  circle.setAttributeNS(null, `r`, radius);
  circle.setAttributeNS(null, `stroke-dasharray`, length.toString());
  circle.setAttributeNS(null, `stroke-dashoffset`, lengthToClear.toString());
  return circle;
};

export const formatTime = (total, passed) => {
  const minutesLeft = Math.floor((total - passed) / 60 / 1000);
  const secondsLeft = (total - passed - minutesLeft * 60 * 1000) / 1000;
  return {
    minutes: minutesLeft,
    seconds: secondsLeft
  };
};

const addLeadingZero = (val) => val < 10 ? `0${val}` : val;
const redrawTimer = (timer, animation) => {
  const total = animation.stepDuration * animation.steps;
  const passed = animation.stepDuration * animation.step;
  const timeLeft = formatTime(total, passed);
  timer.querySelector(`.timer-value-mins`).textContent = addLeadingZero(timeLeft.minutes);
  timer.querySelector(`.timer-value-secs`).textContent = addLeadingZero(timeLeft.seconds);
  return timer;
};

export const initializeCountdown = (time) => {
  const element = document.querySelector(`.timer-line`);
  const radius = parseInt(element.getAttributeNS(null, `r`), 10);
  const timer = document.querySelector(`.timer-value`);
  return animate.animate(animate.getAnimation(0, 1000, time), (animation) => {
    redrawCircle(element, radius, animation);
    redrawTimer(timer, animation);
  }, () => timer.classList.add(`timer-value--finished`));
};
