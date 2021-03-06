import AbstractView from '../AbstractView';

export default class GameView extends AbstractView {
  get template() {
    return `
  <section class="main main--level">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">02</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-wrap"></div>
  </section>
    `;
  }
  startTimer() {
  }
}
