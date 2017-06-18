import AbstractView from '../AbstractView';
import gameRules from '../gameRules';
import currentState from '../currentState';
import statistic from '../statistic';
import {calculateStatistic} from '../functions/get';

export default class resultView extends AbstractView {
  get template() {
    let resultTitle;
    let resultStat;
    let comparison = `Это&nbsp;лучше чем у&nbsp;${currentState.statistic}% &nbsp;игроков`;
    if (currentState.status === `lose` || currentState.rightAnswerCount === 0) {
      resultTitle = gameRules.loseTitle;
      resultStat = gameRules.loseStat;
      comparison = ``;
    } else {
      calculateStatistic(currentState, statistic);
      resultTitle = gameRules.winTitle;
      resultStat = currentState.rightAnswerCount;
      comparison = `Это&nbsp;лучше чем у&nbsp;${currentState.statistic}%&nbsp;игроков`;
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
