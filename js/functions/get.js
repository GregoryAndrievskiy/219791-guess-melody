export const rnd = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

export const randOrd = () => {
  return (Math.round(Math.random()) - 0.5);
};

export const dataTrans = (data, gameType) => {
  let mixUrl = [];
  let mixArtist = [];
  let mixGenre = [];
  const indexBank = [];
  let rand = rnd(0, gameType - 1);
  for (let i = 0; i < data.artist.length; i++) {
    indexBank.push(i);
  }

  const gameBank = indexBank.sort(randOrd).splice(0, gameType);

  gameBank.forEach((i) => {
    mixArtist.push(data.artist[i]);
    mixGenre.push(data.genre[i]);
    mixUrl.push(data.url[i]);
  });

  return {
    artist: mixArtist,
    url: mixUrl,
    genre: mixGenre,
    rightAnswer: rand
  };
};

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
    if (data.genre[item.value] === data.genre[data.rightAnswer]) {
      values.push(item.value);
    }
  });
  return values;
};

export const checkCBs = (checkboxes, data) => {
  const checkForAllRightAnswers = getRightValue(checkboxes, data).length === getCheckedValue(checkboxes).length;
  const checkedValues = getCheckedValue(checkboxes);
  const rightAnswer = data.genre[data.rightAnswer];
  return checkedValues.every((element) => data.genre[element] === rightAnswer) && checkForAllRightAnswers;
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

export const randomizer = (callbackOne, callbackTwo) => {
  if (Math.random() >= 0.5) {
    callbackOne();
  } else {
    callbackTwo();
  }
};

export const renderZeroSecond = (data) => {
  const addLeadingZero = (val) => val < 10 ? `0${val}` : val;
  const timer = document.querySelector(`.timer-value`);
  const initialTime = window.formatTime(data.gameTime, 0);
  timer.querySelector(`.timer-value-mins`).textContent = addLeadingZero(initialTime.minutes);
  timer.querySelector(`.timer-value-secs`).textContent = addLeadingZero(initialTime.seconds);
  document.querySelector(`.timer-line`).setAttributeNS(null, `stroke-dashoffset`, `0`);
};

export const getPassedTime = (data) => {
  return Math.round((new Date().getTime() - data) / 1000);
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

export const calculateStatistic = (currentData, statisticData) => {
  let currentStatistic = statisticData.slice(0);
  currentStatistic.push(currentData.result);
  currentStatistic = getStatistic(currentStatistic);
  const currentPlace = currentStatistic.indexOf(currentData.result) + 1;
  const playersNumber = currentStatistic.length;
  const betterThen = playersNumber - currentPlace;
  currentData.statistic = Math.round(betterThen / playersNumber * 100);
};

export const lose = (data, callback) => {
  data.status = `lose`;
  callback();
};
