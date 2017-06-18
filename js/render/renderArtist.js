import {rnd, dataTrans} from '../functions/get';
import screenArtist from '../templates/screenArtist';
import render from '../functions/render';
import gameData from '../gameData';
import gameRules from '../gameRules';
import currentState from '../currentState';
import renderNextScreen from './renderNextScreen';

export default {
  render: () => {
    const mainWrap = document.querySelector(`.main-wrap`);
    const mixedData = dataTrans(gameData, gameRules.artistsNumber);
    render(mainWrap, screenArtist(mixedData));
    let score = 2;
    const timer = setTimeout(function () {
      score = score / 2;
    }, gameRules.doubleScoreTime);
    const answer = document.querySelectorAll(`.app .main .main-answer-r`);
    const playerWrapper = document.querySelector(`.player-wrapper`);
    let rand = rnd(0, mixedData.url.length - 1);
    window.initializePlayer(playerWrapper, mixedData.url[rand]);
    answer.forEach((item) => {
      item.onclick = (evt) => {
        if (evt.target.value === `val-${rand}`) {
          currentState.rightAnswerCount = currentState.rightAnswerCount + score;
        } else {
          currentState.livesLeft--;
        }
        clearTimeout(timer);
        renderNextScreen();
      };
    });
  },
  answerCount: currentState.rightAnswerCount,
  livesLeft: currentState.livesLeft
};
