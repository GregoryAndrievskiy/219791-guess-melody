import render from './render';
import renderWelcome from './renderWelcome';
import currentState from './currentState';
import screenWin from './screenWin';

export default () => {
  render(screenWin(currentState));
  const replay = document.querySelector(`.main-replay`);
  replay.onclick = () => {
    renderWelcome();
  };
};
