import render from './render';
import renderWelcome from './renderWelcome';
import currentState from './currentState';
import screenResult from './screenResult';
import screenWin from './screenWin';

export default () => {
  render(screenResult(screenWin(currentState)));
  const replay = document.querySelector(`.main-replay`);
  replay.onclick = () => {
    renderWelcome();
  };
};
