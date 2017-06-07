import elementCreator from './elementCreator';

const resultTemplate = (data) => `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    ${data}
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`;

export default (data) => elementCreator(resultTemplate(data));
