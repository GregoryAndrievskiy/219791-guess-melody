import {formatTime, initializeCountdown} from './displayTimer';

export const getCheckedValue = (checkboxes) => {
  const values = [];
  checkboxes.forEach((item) => {
    if (item.checked) {
      values.push(item.value);
    }
  });
  return values;
};

export const getRightValue = (checkboxes, data) => {
  const values = [];
  checkboxes.forEach((item) => {
    if (item.value === data.genre) {
      values.push(item.value);
    }
  });
  return values;
};

export const checkCheckboxes = (checkboxes, data) => {
  const checkForAllRightAnswers = getRightValue(checkboxes, data).length === getCheckedValue(checkboxes).length;
  const checkedValues = getCheckedValue(checkboxes);
  const rightAnswer = data.genre;
  return checkedValues.every((element) => element === rightAnswer) && checkForAllRightAnswers;
};

export const validateForm = (inputs, submitButton, checkboxes) => {
  submitButton.disabled = true;
  inputs.forEach((item) => {
    item.checked = false;
  });
  inputs.forEach((item) => {
    item.onclick = () => {
      if (checkboxes.every((element) => !element.checked)) {
        submitButton.disabled = true;
      } else {
        submitButton.disabled = false;
      }
    };
  });
};

export const renderInitialState = (state, data) => {
  const addLeadingZero = (val) => val < 10 ? `0${val}` : val;
  const timer = document.querySelector(`.timer-value`);
  const initialTime = formatTime(data.gameTime, 0);
  timer.querySelector(`.timer-value-mins`).textContent = addLeadingZero(initialTime.minutes);
  timer.querySelector(`.timer-value-secs`).textContent = addLeadingZero(initialTime.seconds);
  document.querySelector(`.timer-line`).setAttributeNS(null, `stroke-dashoffset`, `0`);
  document.querySelector(`.timer-value`).classList.remove(`timer-value--finished`);
  initializeCountdown(data.gameTime / 1000);
  state.rightAnswerCount = 0;
  state.answerCount = data.gamesNumber;
  state.livesLeft = data.lives;
  state.status = ``;
  state.statHash = 0;
};

export const getPassedTime = (data) => {
  return Math.round((new Date().getTime() - data) / 1000);
};

export const getResult = (state) => {
  if (state.rightAnswerCount === 0) {
    state.status = `lose`;
  } else {
    if (state.rightAnswerCount < 10) {
      state.rightAnswerCount = `0` + state.rightAnswerCount;
    }
    state.result.date = new Date().getTime();
    state.statHash = state.rightAnswerCount.toString() + getPassedTime(state.startTime);
  }
};

export const getStatistic = (data) => {
  const newData = data.slice(0);
  const getRank = (array) => {
    return array.answers;
  };
  const timeComparator = (left, right) => {
    if (left < right) {
      return -1;
    }
    if (left > right) {
      return 1;
    }
    return 0;
  };
  newData.sort((left, right) => {
    let rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = timeComparator(left.time, right.time);
    }
    return rankDiff;
  });
  return newData;
};

export const calculateStatistic = (state, statisticData) => {
  statisticData.push(state.result);
  const currentStatistic = getStatistic(statisticData);
  const currentPlace = currentStatistic.indexOf(state.result) + 1;
  const playersNumber = currentStatistic.length;
  const betterThen = playersNumber - currentPlace;
  state.statistic = Math.round(betterThen / playersNumber * 100);
  if (currentPlace === 1) {
    state.status = `record`;
  } else {
    state.status = `newstatus`;
  }
};

export const checkHashData = (data, state) => {
  if (data) {
    let score = data.slice(0, 2).replace(/^[0\.]+/, ``);
    if (score === ``) {
      state.status = `lose`;
      score = 0;
    } else {
      state.status = `newstatus`;
    }
    const time = +data.slice(2);
    state.rightAnswerCount = score;
    state.result.answers = score;
    state.result.time = time;
  }
};
