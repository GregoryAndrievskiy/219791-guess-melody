import render from './functions/render';
import Application from './Application';
import {renderInitialState, getResult, randomQuestion, checkCBs, validateForm} from './functions/get';
import gameRules from './gameRules';
import currentState from './currentState';
import artist from './screens/artist';
import genre from './screens/genre';

export default class GamePresenter {
  constructor() {
    this.state = currentState;
  }
  initializeGame() {
    renderInitialState(this.state, gameRules);
    this.nextScreen();
  }
  startTimer() {
    const endgame = () => {
      this.state.status = `lose`;
      clearTimeout(this.state.timer);
      Application.showStats(this.state);
    };
    const timeout = () => setTimeout(endgame, gameRules.gameTime);
    this.state.startTime = new Date().getTime();
    this.state.timer = timeout();
  }
  nextScreen() {
    this.state.answerCount--;
    if (this.state.answerCount < 0 || this.state.livesLeft === 0) {
      getResult(this.state);
      Application.showStats();
      clearTimeout(this.state.timer);
    } else {
      randomQuestion(genre, artist);
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
    window.initializePlayer(playerWrapper, this.state.rightAnswer.url[this.state.rightAnswer.rightAnswer]);
  }
  renderGenre(view) {
    const mainWrap = document.querySelector(`.main-wrap`);
    render(mainWrap, view.element);
    const playerWrapper = document.querySelectorAll(`.player-wrapper`);
    playerWrapper.forEach(function (element, index) {
      window.initializePlayer(element, currentState.rightAnswer.url[index]);
    });
  }
  checkRadio(evt) {
    if (evt.target.value === `val-${this.state.rightAnswer.rightAnswer}`) {
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
    if (checkCBs(chkBoxes, this.state.rightAnswer)) {
      this.state.rightAnswerCount = this.state.rightAnswerCount + this.state.score;
    } else {
      this.state.livesLeft--;
    }
  }
}
