import gameData from '../gameData';
import currentState from '../currentState';
import AbstractView from '../AbstractView';

export default class ArtistView extends AbstractView {
  get template() {
    const file = gameData.currentGame;
    const artistQuestion = (name, i) => `
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="${file.answers[i].isCorrect}" />
        <label class="main-answer" for="answer-${i}">
          <img class="main-answer-preview" src="${file.answers[i].image.url}">
          ${file.answers[i].title}
        </label>
      </div>`;
    return `<div>
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper"></div>
        <form class="main-list">
          ${file.answers.reduce((previousValue, currentItem, index) => {
            return previousValue + artistQuestion(currentItem, index);
          }, ``)}
        </form>
      </div>`;
  }
  bind() {
    const answer = this.element.querySelectorAll(`.main-answer-r`);
    currentState.eventElement = answer;
    answer.forEach((item) => {
      item.onclick = (evt) => {
        this.getAnswer(evt);
        item.onclick = null;
      };
    });
  }
  getAnswer() {
  }
}
