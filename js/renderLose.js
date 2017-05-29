import elementCreator from './elementCreator';
import render from './render';
import renderWelcome from './renderWelcome';

const loseStat = {
  title: `Вы проиграли`,
  stat: `Ничего, вам повезет в следующий раз`,
};
const loseScreen = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${loseStat.title}</h2>
    <div class="main-stat">${loseStat.stat}</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`;

const lose = elementCreator(loseScreen);

function renderLose() {
  render(lose);
  const replay = document.querySelector(`.main-replay`);
  replay.addEventListener(`click`, function () {
    renderWelcome();
  });
}

export default renderLose;
