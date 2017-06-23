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

export const checkCBs = (checkboxes, data) => {
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

export const chooseQuestion = (number, data) => {
  return data[number];
};

export const renderInitialState = (state, data) => {
  const addLeadingZero = (val) => val < 10 ? `0${val}` : val;
  const timer = document.querySelector(`.timer-value`);
  const initialTime = window.formatTime(data.gameTime, 0);
  timer.querySelector(`.timer-value-mins`).textContent = addLeadingZero(initialTime.minutes);
  timer.querySelector(`.timer-value-secs`).textContent = addLeadingZero(initialTime.seconds);
  document.querySelector(`.timer-line`).setAttributeNS(null, `stroke-dashoffset`, `0`);
  document.querySelector(`.timer-value`).classList.remove(`timer-value--finished`);
  window.initializeCountdown(data.gameTime / 1000);
  state.rightAnswerCount = 0;
  state.answerCount = data.gamesNumber;
  state.livesLeft = data.lives;
  state.status = ``;
};

export const getPassedTime = (data) => {
  return Math.round((new Date().getTime() - data) / 1000);
};

export const getResult = (state) => {
  if (state.rightAnswerCount === 0) {
    state.status = `lose`;
  }
  let answerCount = 0;
  if (state.rightAnswerCount < 10) {
    answerCount = `0` + state.rightAnswerCount;
  } else {
    answerCount = state.rightAnswerCount;
  }
  state.statHash = answerCount.toString() + getPassedTime(state.startTime);
};

export const getStatistic = (data) => {
  const newData = data.slice(0);
  const getRank = (array) => {
    let rank;
    rank = array.answers;
    return rank;
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
  let currentStatistic = statisticData.slice(0);
  currentStatistic.push(state.result);
  currentStatistic = getStatistic(currentStatistic);
  const currentPlace = currentStatistic.indexOf(state.result) + 1;
  const playersNumber = currentStatistic.length;
  const betterThen = playersNumber - currentPlace;
  state.statistic = Math.round(betterThen / playersNumber * 100);
  if (currentPlace === 1) {
    state.status = `record`;
  } else {
    state.status = ``;
  }
};

export const checkHashData = (data, state) => {
  if (data) {
    const score = data.slice(0, 2).replace(/^[0\.]+/, ``);
    if (score === ``) {
      state.status = `lose`;
    } else {
      state.status = `newstatus`;
    }
    const time = data.slice(2);
    state.rightAnswerCount = score;
    state.result.answers = score;
    state.result.time = time;
  }
};
