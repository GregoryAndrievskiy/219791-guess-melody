import elementCreator from '../functions/elementCreator';

const questionArtist = (name, i) => `
  <div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="val-${i}" />
    <label class="main-answer" for="answer-${i}">
      <img class="main-answer-preview" src="">
      ${name}
    </label>
  </div>`;

const artistTemplate = (data) => `
  <div>
    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper"></div>
    <form class="main-list">
      ${data.artist.reduce((previousValue, currentItem, index) => {
        return previousValue + questionArtist(currentItem, index);
      }, ``)}
    </form>
  </div>`;

export default (data) => elementCreator(artistTemplate(data));
