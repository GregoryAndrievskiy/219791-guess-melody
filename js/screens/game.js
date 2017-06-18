import GameView from './game-view';
import render from '../functions/render';
import {renderZeroSecond} from '../functions/get';
import gameRules from '../gameRules';
import currentState from '../currentState';

const game = () => {
  const gameView = new GameView();
  gameView.startTimer = () => {
    renderZeroSecond(gameRules);
    document.querySelector(`.timer-value`).classList.remove(`timer-value--finished`);
    const countDown = () => window.initializeCountdown(gameRules.gameTime / 1000);
    currentState.countDown = countDown();
  };
  const main = document.querySelector(`.app .main`);
  render(main, gameView.element);
  gameView.startTimer();
};

export default game;
