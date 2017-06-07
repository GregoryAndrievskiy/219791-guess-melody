import get from './get';
import screenArtist from './screenArtist';
import render from './render';
import gameData from './gameData';
import gameRules from './gameRules';
import currentState from './currentState';
import renderNextScreen from './renderNextScreen';

export default {
  render: () => {
    const mixedData = get.dataTrans(gameData, gameRules.artistsNumber);
    render(screenArtist(mixedData));
    const answer = document.querySelectorAll(`.app .main .main-answer-r`);
    const playerWrapper = document.querySelector(`.player-wrapper`);
    let rnd = get.rnd(0, mixedData.url.length - 1);
    window.initializePlayer(playerWrapper, mixedData.url[rnd]);
    answer.forEach((item) => {
      item.onclick = (evt) => {
        if (evt.target.value === `val-${rnd}`) {
          currentState.rightAnswerCount++;
        }
        renderNextScreen();
      };
    });
  },
  answerCount: currentState.rightAnswerCount
};
