export default (name, i) => `
  <div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="val-${i}" />
    <label class="main-answer" for="answer-${i}">
      <img class="main-answer-preview" src="">
      ${name}
    </label>
  </div>`;
