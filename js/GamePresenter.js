import render from './functions/render';
import Application from './Application';
import {renderInitialState, getResult, chooseQuestion, checkCBs, validateForm} from './functions/get';
import gameRules from './gameRules';
import currentState from './currentState';
import artist from './screens/artist';
import genre from './screens/genre';
import gameData from './gameData';

export default class GamePresenter {
  constructor() {
    this.state = currentState;
    this.data = gameData.loaded;
  }
  initializeGame() {
    renderInitialState(this.state, gameRules);
    this.nextScreen();
    this._getStatistic();
  }
  startTimer() {
    const endgame = () => {
      this.state.status = `lose`;
      clearTimeout(this.state.timer);
      Application.showStats();
    };
    const timeout = () => setTimeout(endgame, gameRules.gameTime);
    this.state.startTime = new Date().getTime();
    this.state.timer = timeout();
  }
  nextScreen() {
    const gameNumber = 10 - this.state.answerCount;
    this.state.answerCount--;
    if (this.state.answerCount < 0 || this.state.livesLeft === 0) {
      getResult(this.state);
      this._sendStatistic()
        .then(Application.showStats());
      clearTimeout(this.state.timer);
    } else {
      gameData.currentGame = chooseQuestion(gameNumber, this.data);
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
    this.state.score = 2;
    return setTimeout(() => {
      this.state.score = this.state.score / 2;
    }, gameRules.doubleScoreTime);
  }
  renderArtist(view) {
    const mainWrap = document.querySelector(`.main-wrap`);
    render(mainWrap, view.element);
    const playerWrapper = document.querySelector(`.player-wrapper`);
    window.initializePlayer(playerWrapper, gameData.currentGame.src);
  }
  renderGenre(view) {
    const mainWrap = document.querySelector(`.main-wrap`);
    render(mainWrap, view.element);
    const playerWrapper = document.querySelectorAll(`.player-wrapper`);
    playerWrapper.forEach(function (element, index) {
      window.initializePlayer(element, gameData.currentGame.answers[index].src);
    });
  }
  checkRadio(evt) {
    if (evt.target.value === `true`) {
      this.state.rightAnswerCount = this.state.rightAnswerCount + this.state.score;
    } else {
      this.state.livesLeft--;
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
    if (checkCBs(chkBoxes, gameData.currentGame)) {
      this.state.rightAnswerCount = this.state.rightAnswerCount + this.state.score;
    } else {
      this.state.livesLeft--;
    }
  }
  _sendStatistic() {
    const requestSettings = {
      body: JSON.stringify(this.state.result),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(gameData.url, requestSettings);
  }
  _getStatistic() {
    const requestSettings = {
      headers: {
        'Content-Type': `application/json`
      },
      method: `GET`
    };
    return fetch(gameData.url, requestSettings)
      .then((resp) => resp.json())
      .then((data) => (gameData.stats = data));
  }
}
