import Welcome from './screens/welcome';
import Game from './screens/game';
import Result from './screens/result';
import currentState from './currentState';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stats`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``).split(`=`);

export default class Application {
  constructor() {
    this.routes = {
      [ControllerID.WELCOME]: Welcome,
      [ControllerID.GAME]: Game,
      [ControllerID.STATS]: Result
    };
    window.onhashchange = () => {
      const hash = getControllerIDFromHash(location.hash);
      this.changeController(hash[0]);
      const data = hash[1];
      if (data) {
        let score = data.slice(0, 2);
        let time = Math.round(data.slice(2) / 1000000);
        currentState.rightAnswerCount = score;
        currentState.result.answers = score;
        currentState.result.time = time;
      }
    };
  }
  changeController(route = ``) {
    const Controller = this.routes[route];
    new Controller(currentState).init();
  }
  init() {
    this.changeController(getControllerIDFromHash(location.hash)[0]);
  }
  static showWelcome() {
    location.hash = ControllerID.WELCOME;
  }
  static showGame() {
    location.hash = ControllerID.GAME;
  }
  static showStats() {
    location.hash = ControllerID.STATS;
  }
}
