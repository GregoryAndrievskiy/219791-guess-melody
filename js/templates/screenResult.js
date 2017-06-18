import elementCreator from '../functions/elementCreator';
import gameRules from '../gameRules';

const resultTemplate = (data) => `
  <section class="main main--result">
    <section class="logo" title="${gameRules.title}"><h1>${gameRules.title}</h1></section>
    ${data}
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>
`;

export default (data) => elementCreator(resultTemplate(data));
