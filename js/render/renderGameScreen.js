import render from '../functions/render';
import {renderZeroSecond} from '../functions/get';
import gameRules from '../gameRules';
import currentState from '../currentState';
import screenGame from '../templates/screenGame';

export default () => {
  const main = document.querySelector(`.app .main`);
  render(main, screenGame);
  renderZeroSecond(gameRules);
  document.querySelector(`.timer-value`).classList.remove(`timer-value--finished`);
  const countDown = () => window.initializeCountdown(gameRules.gameTime / 1000);
  currentState.countDown = countDown();
};
