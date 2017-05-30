import elementCreator from './elementCreator';

const welcomeStat = {
  start: `Начать игру`,
  rules: `Правила игры`,
  text: `Правила просты&nbsp;— за&nbsp;2 минуты дать максимальное количество правильных ответов.<br>Удачи!`
};

const welcomeScreen = `
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">${welcomeStat.start}</button>
    <h2 class="title main-title">${welcomeStat.rules}</h2>
    <p class="text main-text">
      ${welcomeStat.text}
    </p>
  </section>
`;

const welcome = elementCreator(welcomeScreen);

export default welcome;
