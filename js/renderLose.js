import render from './render';
import renderWelcome from './renderWelcome';
import screenLose from './screenLose';
import screenResult from './screenResult';

export default () => {
  render(screenResult(screenLose));
  const replay = document.querySelector(`.main-replay`);
  replay.onclick = () => {
    renderWelcome();
  };
};
