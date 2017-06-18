import gameData from '../gameData';
import gameRules from '../gameRules';
import currentState from '../currentState';
import {dataTrans} from '../functions/get';
import AbstractView from '../AbstractView';

export default class ArtistView extends AbstractView {
  get template() {
    const mixedData = dataTrans(gameData, gameRules.artistsNumber);
    currentState.rightAnswer = mixedData;
    const artistQuestion = (name, i) => `
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="val-${i}" />
        <label class="main-answer" for="answer-${i}">
          <img class="main-answer-preview" src="">
          ${name}
        </label>
      </div>`;
    return `<div>
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper"></div>
        <form class="main-list">
          ${mixedData.artist.reduce((previousValue, currentItem, index) => {
            return previousValue + artistQuestion(currentItem, index);
          }, ``)}
        </form>
      </div>`;
  }
  bind() {
    const answer = this.element.querySelectorAll(`.main-answer-r`);
    answer.forEach((item) => {
      item.onclick = (evt) => {
        this.getAnswer(evt);
      };
    });
  }
  getAnswer() {
  }
}
