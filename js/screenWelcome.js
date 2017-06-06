import elementCreator from './elementCreator';

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

export default (data) => elementCreator(welcomeTemplate(data));
