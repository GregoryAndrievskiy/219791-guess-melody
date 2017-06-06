import render from './render';
import renderWelcome from './renderWelcome';
import screenLose from './screenLose';

export default () => {
  render(screenLose());
  const replay = document.querySelector(`.main-replay`);
  replay.onclick = () => {
    renderWelcome();
  };
};
