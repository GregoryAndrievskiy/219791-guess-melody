import get from './get';
import render from './render';
import renderNextScreen from './renderNextScreen';
import gameData from './gameData';
import gameRules from './gameRules';
import currentState from './currentState';
import screenGenre from './screenGenre';

let bank = {};

let dataTrans = (data) => {
  let mixUrl = [];
  let mixGenre = [];
  const indexBank = [];
  let rnd = get.rnd(0, gameRules.genreNumber - 1);
  for (let i = 0; i < data.genre.length; i++) {
    indexBank.push(i);
  }

  const gameBank = indexBank.sort(get.randOrd).splice(0, gameRules.genreNumber);

  gameBank.forEach((i) => {
    mixGenre.push(data.genre[i]);
    mixUrl.push(data.url[i]);
  });

  bank = {
    genre: mixGenre,
    url: mixUrl,
    rndGenre: rnd
  };

  return bank;
};

export default {
  render: () => {
    render(screenGenre(dataTrans(gameData), bank));
    const input = document.getElementsByName(`answer`);
    const send = document.querySelector(`.genre-answer-send`);
    const playerWrapper = document.querySelectorAll(`.player-wrapper`);
    const chkBoxes = Array.from(document.getElementsByName(`answer`));
    playerWrapper.forEach(function (element, index) {
      window.initializePlayer(element, bank.url[index]);
    });
    send.disabled = true;
    input.forEach((item) => {
      item.checked = false;
    });
    input.forEach((item) => {
      item.onclick = () => {
        if (chkBoxes.every((element) => !element.checked)) {
          send.disabled = true;
        } else {
          send.disabled = false;
        }
      };
    });
    send.onclick = (evt) => {
      evt.preventDefault();
      const checkedCBs = [];
      chkBoxes.forEach((item) => {
        if (item.checked) {
          checkedCBs.push(item.value);
        }
      });
      if (checkedCBs.every((element) => (bank.genre[element] === bank.genre[bank.rndGenre]))) {
        currentState.rightAnswerCount++;
      }
      renderNextScreen();
    };
  },
  answerCount: currentState.rightAnswerCount
};
