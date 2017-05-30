import render from './render';
import artist from './artist';
import renderGenre from './renderGenre';

function renderArtist() {
  render(artist);
  const answer = document.querySelectorAll(`.main-answer`);
  answer.forEach(function (item) {
    item.addEventListener(`click`, function () {
      renderGenre();
    });
  });
}

export default renderArtist;
