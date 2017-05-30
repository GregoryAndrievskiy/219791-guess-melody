import render from './render';
import renderWin from './renderWin';
import renderLose from './renderLose';
import genre from './genre';

function renderGenre() {
  render(genre);
  const input = document.getElementsByName(`answer`);
  const send = document.querySelector(`.genre-answer-send`);
  send.disabled = true;

  input.forEach(function (item) {
    item.checked = false;
  });

  input.forEach(function (item) {
    item.addEventListener(`click`, function () {
      const chkBoxes = Array.from(document.getElementsByName(`answer`));
      if (chkBoxes.every((element) => !element.checked)) {
        send.disabled = true;
      } else {
        send.disabled = false;
      }
    });
  });

  send.addEventListener(`click`, function () {
    if (Math.random() >= 0.5) {
      renderWin();
    } else {
      renderLose();
    }
  });
}

export default renderGenre;
