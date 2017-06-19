import WelcomeView from './welcome-view';
import render from '../functions/render';
import result from '../screens/result';
import nextScreen from '../functions/nextScreen';
import gameRules from '../gameRules';
import currentState from '../currentState';
import Application from '../Application';

export default class Welcome {
  constructor() {
    this.view = new WelcomeView();
  }
  render() {
    const main = document.querySelector(`.app .main`);
    render(main, this.view.element);
  }
  init() {
    this.render();
    this.view.startGame = () => {
      Application.showGame();
      const endgame = () => {
        currentState.status = `lose`;
        result();
      };
      const timeout = () => setTimeout(endgame, gameRules.gameTime);
      currentState.startTime = new Date().getTime();
      currentState.timer = timeout();
      nextScreen();
    };
  }
}
