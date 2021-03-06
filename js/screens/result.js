import ResultView from './result-view';
import render from '../functions/render';
import Application from '../Application';

export default class Result {
  constructor(state) {
    this.view = new ResultView(state);
  }
  _render() {
    const main = document.querySelector(`.app .main`);
    render(main, this.view.element);
  }
  init() {
    this._render();
    this.view.newGame = () => {
      Application.showWelcome();
    };
  }
}
