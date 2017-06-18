import {dataTrans, checkCBs, validateForm} from '../functions/get';
import render from '../functions/render';
import renderNextScreen from './renderNextScreen';
import gameData from '../gameData';
import gameRules from '../gameRules';
import currentState from '../currentState';
import screenGenre from '../templates/screenGenre';

export default {
  render: () => {
    const mainWrap = document.querySelector(`.main-wrap`);
    const mixedData = dataTrans(gameData, gameRules.genreNumber);
    render(mainWrap, screenGenre(mixedData));
    let score = 2;
    const timer = setTimeout(function () {
      score = score / 2;
    }, gameRules.doubleScoreTime);
    const send = document.querySelector(`.genre-answer-send`);
    const playerWrapper = document.querySelectorAll(`.player-wrapper`);
    const chkBoxes = Array.from(document.getElementsByName(`answer`));
    const inputs = document.getElementsByName(`answer`);
    playerWrapper.forEach(function (element, index) {
      window.initializePlayer(element, mixedData.url[index]);
    });
    validateForm(inputs, send, chkBoxes);
    send.onclick = (evt) => {
      evt.preventDefault();
      if (checkCBs(chkBoxes, mixedData)) {
        currentState.rightAnswerCount = currentState.rightAnswerCount + score;
      } else {
        currentState.livesLeft--;
      }
      clearTimeout(timer);
      renderNextScreen();
    };
  },
  answerCount: currentState.rightAnswerCount,
  livesLeft: currentState.livesLeft
};
