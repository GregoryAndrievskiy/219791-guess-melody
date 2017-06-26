import WelcomeView from './welcome-view';
import render from '../functions/render';
import Application from '../Application';

export default class Welcome {
  constructor() {
    this.view = new WelcomeView();
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
  }
}
