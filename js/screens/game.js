import GameView from './game-view';
import render from '../functions/render';
import {renderInitialState} from '../functions/get';
import gameRules from '../gameRules';
import currentState from '../currentState';

export default class Game {
  constructor() {
    this.view = new GameView();
  }
  render() {
    const main = document.querySelector(`.app .main`);
    render(main, this.view.element);
  }
  init() {
    this.view.startTimer = () => {
      renderInitialState(currentState, gameRules);
    };
    this.render();
    this.view.startTimer();
  }
}
