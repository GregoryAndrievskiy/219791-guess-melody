import render from './render';
import renderWelcome from './renderWelcome';
import elementCreator from './elementCreator';

const loseTemplate = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">Вы проиграли</h2>
    <div class="main-stat">Ничего, вам повезет в следующий раз</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`;

const content = (data) => elementCreator(data);

export default () => {
  render(content(loseTemplate));
  const replay = document.querySelector(`.main-replay`);
  replay.onclick = () => {
    renderWelcome();
  };
}
