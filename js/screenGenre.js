import elementCreator from './elementCreator';
import questionGenre from './questionGenre';

const genreTemplate = (data, bank) => `
  <section class="main main--level main--level-genre">
    <h2 class="title">Выберите ${bank.genre[bank.rndGenre]} треки</h2>
    <form class="genre">
      ${data.url.reduce((previousValue, currentItem, index) => {
        return previousValue + questionGenre(index);
      }, ``)}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </section>
`;

export default (data, bank) => elementCreator(genreTemplate(data, bank));
