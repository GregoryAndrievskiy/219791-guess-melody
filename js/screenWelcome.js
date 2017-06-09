import elementCreator from './elementCreator';

const welcomeTemplate = (data) =>`
  <section class="main main--welcome">
    <section class="logo" title="${data.title}"><h1>${data.title}</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      ${data.rules}
    </p>
  </section>
`;

export default (data) => elementCreator(welcomeTemplate(data));
