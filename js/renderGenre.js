import elementCreator from './elementCreator';
import render from './render';
import renderWin from './renderWin';
import renderLose from './renderLose';

const genreStat = {
  title: `Выберите инди-рок треки`,
  value: `answer-1`,
};
const genreScreen = `
  <section class="main main--level main--level-genre">
    <h2 class="title">${genreStat.title}</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </section>
`;

const genre = elementCreator(genreScreen);

function renderGenre() {
  render(genre);
  const input = document.getElementsByTagName(`input`);
  const send = document.querySelector(`.genre-answer-send`);
  send.disabled = true;
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener(`change`, function () {
      if (input[i].checked) {
        send.disabled = false;
      } else {
        send.disabled = true;
      }
    });
  }
  send.addEventListener(`click`, function () {
    if (Math.random() >= 0.5) {
      renderWin();
    } else {
      renderLose();
    }
  });
}

export default renderGenre;
