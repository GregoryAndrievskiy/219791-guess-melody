import render from './functions/render';
import {initializePlayer} from './functions/player';
import Application from './Application';
import {renderInitialState, getResult, checkCheckboxes, validateForm} from './functions/get';
import gameRules from './gameRules';
import currentState from './currentState';
import artist from './screens/artist';
import genre from './screens/genre';
import gameData from './gameData';

export default class GamePresenter {
  constructor() {
    this._state = currentState;
    this._data = gameData.loaded;
  }
  initializeGame() {
    renderInitialState(this._state, gameRules);
    this.nextScreen();
  }
  startTimer() {
    const endgame = () => {
      this._state.status = `lose`;
      clearTimeout(this._state.timer);
      Application.showStats();
    };
    const timeout = () => setTimeout(endgame, gameRules.gameTime);
    this._state.startTime = new Date().getTime();
    this._state.timer = timeout();
  }
  nextScreen() {
    const gameNumber = 10 - this._state.answerCount;
    this._state.answerCount--;
    if (this._state.answerCount < 0 || this._state.livesLeft === 0) {
      getResult(this._state);
      this._sendStatistic()
        .then(Application.showStats(this._state));
      clearTimeout(this._state.timer);
    } else {
      gameData.currentGame = this._data[gameNumber];
      switch (gameData.currentGame.type) {
        case `genre`:
          genre();
          break;
        case `artist`:
          artist();
          break;
      }
    }
  }
  doubleScoreTimer() {
    this._state.score = 2;
    return setTimeout(() => {
      this._state.score = this._state.score / 2;
    }, gameRules.doubleScoreTime);
  }
  renderArtist(view) {
    const mainWrap = document.querySelector(`.main-wrap`);
    render(mainWrap, view.element);
    const playerWrapper = document.querySelector(`.player-wrapper`);
    initializePlayer(playerWrapper, gameData.currentGame.src);
  }
  renderGenre(view) {
    const mainWrap = document.querySelector(`.main-wrap`);
    render(mainWrap, view.element);
    const playerWrapper = document.querySelectorAll(`.player-wrapper`);
    playerWrapper.forEach(function (element, index) {
      initializePlayer(element, gameData.currentGame.answers[index].src);
    });
  }
  checkRadio(evt) {
    if (evt.target.value === `true`) {
      this._state.rightAnswerCount = this._state.rightAnswerCount + this._state.score;
    } else {
      this._state.livesLeft--;
    }
  }
  validateAnswer() {
    const send = document.querySelector(`.genre-answer-send`);
    const inputs = document.getElementsByName(`answer`);
    const chkBoxes = Array.from(inputs);
    validateForm(inputs, send, chkBoxes);
  }
  checkBox() {
    const chkBoxes = Array.from(document.getElementsByName(`answer`));
    if (checkCheckboxes(chkBoxes, gameData.currentGame)) {
      this._state.rightAnswerCount = this._state.rightAnswerCount + this._state.score;
    } else {
      this._state.livesLeft--;
    }
  }
  _sendStatistic() {
    const requestSettings = {
      body: JSON.stringify(this._state.result),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(gameData.url, requestSettings);
  }
  loadData() {
    return fetch(gameData.data)
      .then((resp) => resp.json())
      .then((data) => (gameData.loaded = data))
      .then(() => {
        document.querySelector(`.main-play`).removeAttribute(`style`);
      });
  }
}
