import render from '../functions/render';
import renderWelcome from './renderWelcome';
import screenLose from '../templates/screenLose';
import screenResult from '../templates/screenResult';

export default () => {
  const main = document.querySelector(`.app .main`);
  render(main, screenResult(screenLose));
  const replay = document.querySelector(`.main-replay`);
  replay.onclick = () => {
    renderWelcome();
  };
};
