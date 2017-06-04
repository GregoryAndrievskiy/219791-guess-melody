import render from './render';
import renderNextScreen from './renderNextScreen';
import elementCreator from './elementCreator';
import gameRules from './gameRules.js';

const welcomeTemplate = (data) =>`
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${data.time} минуты дать
      максимальное количество правильных ответов.<br>
      Удачи!
    </p>
  </section>
`;

const content = (data) => elementCreator(welcomeTemplate(data));

export default () => {
  render(content(gameRules));
  const play = document.querySelector(`.main-play`);
  play.onclick = () => {
    renderNextScreen();
  };
};
