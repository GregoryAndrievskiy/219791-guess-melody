import AbstractView from '../AbstractView';
import gameRules from '../gameRules';
import statistic from '../statistic';
import {calculateStatistic} from '../functions/get';

export default class ResultView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    let resultTitle;
    let resultStat;
    let comparison = `Это&nbsp;лучше чем у&nbsp;${this.state.statistic}% &nbsp;игроков`;
    if (this.state.status === `lose` || this.state.rightAnswerCount === 0) {
      resultTitle = gameRules.loseTitle;
      resultStat = gameRules.loseStat;
      comparison = ``;
    } else {
      calculateStatistic(this.state, statistic);
      resultTitle = gameRules.winTitle;
      resultStat = this.state.rightAnswerCount;
      if (this.state.status === `record`) {
        comparison = `Это рекорд!`;
      } else {
        comparison = `Это&nbsp;лучше чем у&nbsp;${this.state.statistic}%&nbsp;игроков`;
      }
    }
    return `
      <section class="main main--result">
        <section class="logo" title="${gameRules.title}"><h1>${gameRules.title}</h1></section>
        <h2 class="title">${resultTitle}</h2>
        <div class="main-stat">${resultStat}</div>
        <span class="main-comparison">${comparison}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `;
  }
  bind() {
    const replay = this.element.querySelector(`.main-replay`);
    replay.onclick = () => {
      this.newGame();
    };
  }
  newGame() {
  }
}
