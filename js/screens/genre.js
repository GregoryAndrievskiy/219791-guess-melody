import GenreView from './genre-view';
import render from '../functions/render';
import nextScreen from '../functions/nextScreen';
import gameRules from '../gameRules';
import currentState from '../currentState';
import {validateForm, checkCBs} from '../functions/get';

const genre = () => {
  const genreView = new GenreView();
  let score = 2;
  const timer = setTimeout(function () {
    score = score / 2;
  }, gameRules.doubleScoreTime);
  const mainWrap = document.querySelector(`.main-wrap`);
  render(mainWrap, genreView.element);
  const send = document.querySelector(`.genre-answer-send`);
  const chkBoxes = Array.from(document.getElementsByName(`answer`));
  const inputs = document.getElementsByName(`answer`);
  validateForm(inputs, send, chkBoxes);
  const playerWrapper = document.querySelectorAll(`.player-wrapper`);
  playerWrapper.forEach(function (element, index) {
    window.initializePlayer(element, currentState.rightAnswer.url[index]);
  });
  genreView.getAnswer = (evt) => {
    evt.preventDefault();
    if (checkCBs(chkBoxes, currentState.rightAnswer)) {
      currentState.rightAnswerCount = currentState.rightAnswerCount + score;
    } else {
      currentState.livesLeft--;
    }
    clearTimeout(timer);
    nextScreen();
  };
};

export default genre;
