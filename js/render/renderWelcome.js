import render from '../functions/render';
import renderGameScreen from '../render/renderGameScreen';
import renderNextScreen from './renderNextScreen';
import renderLose from './renderLose';
import gameRules from '../gameRules';
import screenWelcome from '../templates/screenWelcome';
import currentState from '../currentState';

export default () => {
  const main = document.querySelector(`.app .main`);
  render(main, screenWelcome(gameRules));
  const play = document.querySelector(`.main-play`);
  play.onclick = () => {
    renderGameScreen();
    renderNextScreen();
    const timeout = () => setTimeout(renderLose, gameRules.gameTime);
    currentState.timer = timeout();
    window.initializeCountdown(gameRules.gameTime / 1000);
  };
  currentState.rightAnswerCount = 0;
  currentState.answerCount = gameRules.gamesNumber;
  currentState.livesLeft = gameRules.lives;
};
