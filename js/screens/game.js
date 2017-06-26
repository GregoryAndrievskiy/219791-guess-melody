import GameView from './game-view';
import render from '../functions/render';
import GamePresenter from '../GamePresenter.js';

export default class Game {
  constructor() {
    this.view = new GameView();
    this.presenter = new GamePresenter();
  }
  _render() {
    const main = document.querySelector(`.app .main`);
    render(main, this.view.element);
  }
  init() {
    this.view.startTimer = () => {
      this.presenter.initializeGame();
      this.presenter.startTimer();
    };
    this._render();
    this.view.startTimer();
  }
}
