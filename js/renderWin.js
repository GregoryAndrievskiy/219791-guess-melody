import render from './render';
import renderWelcome from './renderWelcome';
import win from './win';

function renderWin() {
  render(win);
  const replay = document.querySelector(`.main-replay`);
  replay.addEventListener(`click`, function () {
    renderWelcome();
  });
}

export default renderWin;
