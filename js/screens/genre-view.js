import gameData from '../gameData';
import gameRules from '../gameRules';
import currentState from '../currentState';
import {dataTrans} from '../functions/get';
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
    const mixedData = dataTrans(gameData, gameRules.genreNumber);
    currentState.rightAnswer = mixedData;
    const question = (index) => `
          <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="${index}" id="a-${index}">
        <label class="genre-answer-check" for="a-${index}"></label>
      </div>`;
    return `
      <div>
        <h2 class="title">Выберите ${mixedData.genre[mixedData.rightAnswer]} треки</h2>
        <form class="genre">
          ${mixedData.url.reduce((previousValue, currentItem, index) => {
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
