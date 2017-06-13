import render from '../functions/render';
import renderWelcome from './renderWelcome';
import currentState from '../currentState';
import screenResult from '../templates/screenResult';
import screenWin from '../templates/screenWin';

export default () => {
  render(screenResult(screenWin(currentState)));
  const replay = document.querySelector(`.main-replay`);
  replay.onclick = () => {
    renderWelcome();
  };
};
