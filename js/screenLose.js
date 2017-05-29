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

import elementCreator from './createDOM';
const lose = elementCreator(loseScreen);
import render from './render';
import renderWelcome from './screenWelcome';
function renderLose() {
  render(lose);
  let replay = document.querySelector(`.main-replay`);
  replay.addEventListener(`click`, function () {
    renderWelcome();
  });
}
export default renderLose;
