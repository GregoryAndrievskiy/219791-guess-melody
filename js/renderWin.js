import elementCreator from './elementCreator';
import render from './render';
import renderWelcome from './renderWelcome';

const winStat = {
  title: `Вы настоящий меломан!`,
  stat: `За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали 4&nbsp;мелодии`,
  compare: `Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков`,
};
const winScreen = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${winStat.title}</h2>
    <div class="main-stat">${winStat.stat}</div>
    <span class="main-comparison">${winStat.compare}</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`;

const win = elementCreator(winScreen);

function renderWin() {
  render(win);
  const replay = document.querySelector(`.main-replay`);
  replay.addEventListener(`click`, function () {
    renderWelcome();
  });
}

export default renderWin;
