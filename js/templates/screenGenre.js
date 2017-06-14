import elementCreator from '../functions/elementCreator';

const questionGenre = (index) => `
  <div class="genre-answer">
    <div class="player-wrapper"></div>
    <input type="checkbox" name="answer" value="${index}" id="a-${index}">
    <label class="genre-answer-check" for="a-${index}"></label>
  </div>`;

const genreTemplate = (data) => `
  <div>
    <h2 class="title">Выберите ${data.genre[data.rightAnswer]} треки</h2>
    <form class="genre">
      ${data.url.reduce((previousValue, currentItem, index) => {
        return previousValue + questionGenre(index);
      }, ``)}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>
`;

export default (data) => elementCreator(genreTemplate(data));
