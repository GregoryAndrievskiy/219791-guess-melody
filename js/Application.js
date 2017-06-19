import Welcome from './screens/welcome';
import Game from './screens/game';
import Result from './screens/result';
import currentState from './currentState';

export default class Application {
  static showWelcome() {
    new Welcome().init();
  }
  static showGame() {
    new Game().init();
  }
  static showStats() {
    new Result(currentState).init();
  }
}
