import gameRules from './gameRules';
import currentState from './currentState';
import renderGenre from './renderGenre';
import renderArtist from './renderArtist';
import renderWin from './renderWin';

export default () => {
  currentState.answerCount++;
  if (currentState.answerCount === gameRules.gamesNumber + 1) {
    currentState.answerCount = 0;
    renderWin(renderArtist.rightAnswerCount);
  } else {
    if (Math.random() >= 0.5) {
      renderGenre.render();
    } else {
      renderArtist.render();
    }
  }
};
