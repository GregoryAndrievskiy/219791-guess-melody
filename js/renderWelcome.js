import render from './render';
import renderArtist from './renderArtist';
import welcome from './welcome';

function renderWelcome() {
  render(welcome);
  const play = document.querySelector(`.main-play`);
  play.addEventListener(`click`, function () {
    renderArtist();
  });
}

export default renderWelcome;
