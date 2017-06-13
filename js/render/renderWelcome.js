import render from '../functions/render';
import renderNextScreen from './renderNextScreen';
import gameRules from '../gameRules';
import screenWelcome from '../templates/screenWelcome';
import currentState from '../currentState';

export default () => {
  render(screenWelcome(gameRules));
  const play = document.querySelector(`.main-play`);
  play.onclick = () => {
    renderNextScreen();
  };
  currentState.rightAnswerCount = 0;
  currentState.answerCount = gameRules.gamesNumber;
  currentState.livesLeft = gameRules.lives;
};
