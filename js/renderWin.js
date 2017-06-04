import render from './render';
import renderWelcome from './renderWelcome';
import elementCreator from './elementCreator';
import currentState from './currentState';

const winTemplate = (data) => `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">${data.rightAnswerCount}</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`;

const content = (data) => elementCreator(winTemplate(data));

export default () => {
  render(content(currentState));
  const replay = document.querySelector(`.main-replay`);
  replay.onclick = () => {
    renderWelcome();
  };
}
