import gameData from '../gameData';
import AbstractView from '../AbstractView';

export default class GenreView extends AbstractView {
  get template() {
    return this.genreQuestion();
  }
  bind() {
    const send = this.element.querySelector(`.genre-answer-send`);
    send.onclick = (evt) => {
      this.getAnswer(evt);
    };
  }
  genreQuestion() {
    const file = gameData.currentGame;
    const question = (index) => `
          <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="${file.answers[index].genre}" id="${index}">
        <label class="genre-answer-check" for="${index}"></label>
      </div>`;
    return `
      <div>
        <h2 class="title">${file.question}</h2>
        <form class="genre">
          ${file.answers.reduce((previousValue, currentItem, index) => {
            return previousValue + question(index);
          }, ``)}
          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    `;
  }
  getAnswer() {
  }
}
