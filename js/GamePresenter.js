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
  }
  initializeGame() {
    renderInitialState(this._state, gameRules);
    if (this._state.status === `loaded`) {
      this.nextScreen();
    } else {
      return fetch(gameData.dataURL)
        .then((resp) => resp.json())
        .then((data) => (gameData.loaded = data))
        .then(() => this.nextScreen())
        .then(() => (this._state.status = `loaded`));
    }
    return this._state;
  }
  startTimer() {
    const endgame = () => {
      this._state.status = `lose`;
      clearTimeout(this._state.timer);
      Application.showStats(this._state);
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
      gameData.currentGame = gameData.loaded[gameNumber];
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
  loadData() {
    return fetch(gameData.dataURL)
      .then((resp) => resp.json())
      .then((data) => (gameData.loaded = data))
      .then(() => this._getAudioSrc(gameData.loaded, this._allowToPlay))
      .then(() => (this._state.status = `loaded`));
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
  _getAudioSrc(array, callback) {
    let loaded = 0;
    let src = 0;
    array.forEach((element) => {
      if (element.type === `genre`) {
        src = src + 4;
      } else {
        src++;
      }
      return src;
    });
    const loadedAudio = (media) => {
      return () => {
        loaded++;
        media.removeEventListener(`loadeddata`, loadedAudio);
        if (loaded === src) {
          callback();
        }
      };
    };
    array.forEach((game) => {
      switch (game.type) {
        case `genre`:
          game.answers.forEach((answer) => {
            const audio = new Audio(answer.src);
            audio.addEventListener(`loadeddata`, loadedAudio(audio));
          });
          break;
        case `artist`:
          const audio = new Audio(game.src);
          audio.addEventListener(`loadeddata`, loadedAudio(audio));
          break;
      }
    });
  }
  _allowToPlay() {
    document.querySelector(`.main-play`).removeAttribute(`style`);
  }
}
