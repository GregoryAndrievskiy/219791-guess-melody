import currentState from '../currentState';
import renderGenre from './renderGenre';
import renderArtist from './renderArtist';
import renderWin from './renderWin';
import {randomizer, getPassedTime} from '../functions/get';

export default () => {
  currentState.answerCount--;
  if (currentState.answerCount < 0 || currentState.livesLeft === 0) {
    currentState.result.answers = currentState.rightAnswerCount;
    currentState.result.time = getPassedTime(currentState.startTime);
    renderWin(renderArtist.rightAnswerCount);
    clearTimeout(currentState.timer);
    currentState.countDown();
  } else {
    randomizer(renderArtist.render, renderGenre.render);
  }
};
