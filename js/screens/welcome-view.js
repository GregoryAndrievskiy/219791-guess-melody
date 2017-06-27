import gameRules from '../gameRules';
import AbstractView from '../AbstractView';

export default class WelcomeView extends AbstractView {
  get template() {
    return `
      <section class="main main--welcome">
        <section class="logo" title="${gameRules.title}"><h1>${gameRules.title}</h1></section>
        <button class="main-play" style="display: none;">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          ${gameRules.rules}
        </p>
      </section>
      </section>
    `;
  }
  bind() {
    const play = this.element.querySelector(`.main-play`);
    play.onclick = () => {
      this.startGame();
      play.onclick = null;
    };
  }
  startGame() {
  }
}
