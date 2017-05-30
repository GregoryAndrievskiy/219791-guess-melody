import elementCreator from './elementCreator';

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

export default lose;
