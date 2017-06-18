import render from '../functions/render';
import {calculateStatistic} from '../functions/get';
import renderWelcome from './renderWelcome';
import currentState from '../currentState';
import statistic from '../statistic';
import screenResult from '../templates/screenResult';
import screenWin from '../templates/screenWin';

export default () => {
  calculateStatistic(currentState, statistic);
  const main = document.querySelector(`.app .main`);
  render(main, screenResult(screenWin(currentState)));
  const replay = document.querySelector(`.main-replay`);
  replay.onclick = () => {
    renderWelcome();
  };
};
