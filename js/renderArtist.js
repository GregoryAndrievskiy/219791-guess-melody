import get from './get';
import screenArtist from './screenArtist';
import render from './render';
import gameData from './gameData';
import gameRules from './gameRules';
import currentState from './currentState';
import renderNextScreen from './renderNextScreen';

let bank = {};

let dataTrans = (data) => {
  let mixUrl = [];
  let mixArtist = [];
  let indexBank = [0, 1, 2, 3];

  const gameBank = indexBank.sort(get.randOrd).splice(0, gameRules.artistsNumber);

  gameBank.forEach((i) => {
    mixArtist.push(data.artist[i]);
    mixUrl.push(data.url[i]);
  });

  bank = {
    artist: mixArtist,
    url: mixUrl
  };

  return bank;
};

export default {
  render: () => {
    render(screenArtist(dataTrans(gameData)));
    const answer = document.querySelectorAll(`.app .main .main-answer-r`);
    const playerWrapper = document.querySelector(`.player-wrapper`);
    let rnd = get.rnd(0, bank.url.length - 1);
    window.initializePlayer(playerWrapper, bank.url[rnd]);
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
