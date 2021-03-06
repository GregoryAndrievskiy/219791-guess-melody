import Welcome from './screens/welcome';
import Game from './screens/game';
import Result from './screens/result';
import currentState from './currentState';
import {checkHashData} from './functions/get';
import gameData from './gameData';

const ControllerID = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stats`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``).split(`=`);

export default class Application {
  constructor() {
    this._state = currentState;
    this._routes = {
      [ControllerID.WELCOME]: Welcome,
      [ControllerID.GAME]: Game,
      [ControllerID.STATS]: Result
    };
    window.onhashchange = () => {
      const hash = getControllerIDFromHash(location.hash);
      const data = hash[1];
      checkHashData(data, this._state);
      this._changeController(getControllerIDFromHash(hash[0]));
    };
  }
  init() {
    const analyze = () => {
      const hash = getControllerIDFromHash(location.hash);
      const data = hash[1];
      checkHashData(data, this._state);
      this._changeController(getControllerIDFromHash(hash[0]));
    };
    const hash = getControllerIDFromHash(location.hash);
    const data = hash[1];
    checkHashData(data, this._state);
    this._downloadStatistic(analyze);
  }
  _downloadStatistic(callback) {
    const requestSettings = {
      headers: {
        'Content-Type': `application/json`
      },
      method: `GET`
    };
    return fetch(gameData.url, requestSettings)
      .then((resp) => resp.json())
      .then((data) => (gameData.stats = data))
      .then(() => callback());
  }
  _changeController(route = ``) {
    const Controller = this._routes[route];
    new Controller(this._state).init();
  }
  static showWelcome() {
    location.hash = ControllerID.WELCOME;
  }
  static showGame() {
    location.hash = ControllerID.GAME;
  }
  static showStats(state) {
    location.hash = ControllerID.STATS + `=${state.statHash}`;
  }
}
