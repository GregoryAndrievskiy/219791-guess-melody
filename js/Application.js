import Welcome from './screens/welcome';
import Game from './screens/game';
import Result from './screens/result';
import {checkHashData} from './functions/get';
import currentState from './currentState';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stats`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``).split(`=`);

export default class Application {
  constructor() {
    this.state = currentState;
    this.routes = {
      [ControllerID.WELCOME]: Welcome,
      [ControllerID.GAME]: Game,
      [ControllerID.STATS]: Result
    };
    window.onhashchange = () => {
      const hash = getControllerIDFromHash(location.hash);
      const data = hash[1];
      checkHashData(data, this.state);
      this.changeController(hash[0]);
    };
  }
  changeController(route = ``) {
    const Controller = this.routes[route];
    new Controller(this.state).init();
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
  static showStats(state) {
    location.hash = ControllerID.STATS + `=${state.result.hash}`;
  }
}
