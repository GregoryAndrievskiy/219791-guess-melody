import WelcomeView from './welcome-view';
import render from '../functions/render';
import Application from '../Application';
import GamePresenter from '../GamePresenter.js';

export default class Welcome {
  constructor() {
    this.view = new WelcomeView();
    this.presenter = new GamePresenter();
  }
  _render() {
    const main = document.querySelector(`.app .main`);
    render(main, this.view.element);
  }
  init() {
    this._render();
    this.view.startGame = () => {
      Application.showGame();
    };
    this.presenter.loadData();
  }
}
