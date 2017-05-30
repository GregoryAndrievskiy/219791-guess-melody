import render from './render';
import renderWelcome from './renderWelcome';
import lose from './lose';

function renderLose() {
  render(lose);
  const replay = document.querySelector(`.main-replay`);
  replay.addEventListener(`click`, function () {
    renderWelcome();
  });
}

export default renderLose;
