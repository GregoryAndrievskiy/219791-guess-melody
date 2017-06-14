import currentState from '../currentState';
import renderGenre from './renderGenre';
import renderArtist from './renderArtist';
import renderWin from './renderWin';
import {randomizer} from '../functions/get';

export default () => {
  currentState.answerCount--;
  if (currentState.answerCount < 0 || currentState.livesLeft === 0) {
    renderWin(renderArtist.rightAnswerCount);
    clearTimeout(currentState.timer);
  } else {
    randomizer(renderArtist.render, renderGenre.render);
  }
};
