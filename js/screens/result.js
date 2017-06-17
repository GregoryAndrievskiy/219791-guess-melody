import ResultView from './result-view';
import render from '../functions/render';
import welcome from './welcome';
import gameRules from '../gameRules';
import currentState from '../currentState';

const result = () => {
  const resultView = new ResultView();
  resultView.newGame = () => {
    welcome();
  };
  const main = document.querySelector(`.app .main`);
  render(main, resultView.element);
  currentState.rightAnswerCount = 0;
  currentState.answerCount = gameRules.gamesNumber;
  currentState.livesLeft = gameRules.lives;
};

export default result;
