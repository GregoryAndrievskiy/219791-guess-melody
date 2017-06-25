import Welcome from './screens/welcome';
import Game from './screens/game';
import Result from './screens/result';
import currentState from './currentState';
import gameData from './gameData';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stats`
};

const url = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);

export default class Application {
  constructor() {
    this.state = currentState;
    this.routes = {
      [ControllerID.WELCOME]: Welcome,
      [ControllerID.GAME]: Game,
      [ControllerID.STATS]: Result
    };
    this.load(gameData);
    window.onhashchange = () => {
      const hash = getControllerIDFromHash(location.hash);
      this.changeController(hash);
    };
  }
  load(storage) {
    return fetch(url)
      .then((resp) => resp.json())
      .then((data) => (storage.loaded = data));
  }
  changeController(route = ``) {
    const Controller = this.routes[route];
    new Controller(this.state).init();
  }
  init() {
    this.changeController(getControllerIDFromHash(location.hash));
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
