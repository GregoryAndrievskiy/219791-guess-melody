import get from './get';
import render from './render';
import renderNextScreen from './renderNextScreen';
import gameData from './gameData';
import gameRules from './gameRules';
import currentState from './currentState';
import screenGenre from './screenGenre';

export default {
  render: () => {
    const mixedData = get.dataTrans(gameData, gameRules.genreNumber);
    render(screenGenre(mixedData));
    const input = document.getElementsByName(`answer`);
    const send = document.querySelector(`.genre-answer-send`);
    const playerWrapper = document.querySelectorAll(`.player-wrapper`);
    const chkBoxes = Array.from(document.getElementsByName(`answer`));
    playerWrapper.forEach(function (element, index) {
      window.initializePlayer(element, mixedData.url[index]);
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
      if (checkedCBs.every((element) => (mixedData.genre[element] === mixedData.genre[mixedData.rnd]))) {
        currentState.rightAnswerCount++;
      }
      renderNextScreen();
    };
  },
  answerCount: currentState.rightAnswerCount
};
