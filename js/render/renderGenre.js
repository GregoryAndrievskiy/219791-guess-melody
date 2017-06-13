import {dataTrans, checkCBs, validateForm} from '../functions/get';
import render from '../functions/render';
import renderNextScreen from './renderNextScreen';
import gameData from '../gameData';
import gameRules from '../gameRules';
import currentState from '../currentState';
import screenGenre from '../templates/screenGenre';

export default {
  render: () => {
    const mixedData = dataTrans(gameData, gameRules.genreNumber);
    render(screenGenre(mixedData));
    const send = document.querySelector(`.genre-answer-send`);
    const playerWrapper = document.querySelectorAll(`.player-wrapper`);
    const chkBoxes = Array.from(document.getElementsByName(`answer`));
    playerWrapper.forEach(function (element, index) {
      window.initializePlayer(element, mixedData.url[index]);
    });
    validateForm(send, chkBoxes);
    send.onclick = (evt) => {
      evt.preventDefault();
      if (checkCBs(chkBoxes, mixedData)) {
        currentState.rightAnswerCount++;
      } else {
        currentState.livesLeft--;
      }
      renderNextScreen();
    };
  },
  answerCount: currentState.rightAnswerCount,
  livesLeft: currentState.livesLeft
};
