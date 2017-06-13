export default (index) => `
  <div class="genre-answer">
    <div class="player-wrapper"></div>
    <input type="checkbox" name="answer" value="${index}" id="a-${index}">
    <label class="genre-answer-check" for="a-${index}"></label>
  </div>`;
