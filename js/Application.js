import Welcome from './screens/welcome';
import Game from './screens/game';
import Result from './screens/result';

export default class Application {
  static showWelcome() {
    new Welcome().init();
  }
  static showGame() {
    new Game().init();
  }
  static showStats(stats) {
    new Result(stats).init();
  }
}
