import WelcomeView from './welcome-view';
import render from '../functions/render';
import result from '../screens/result';
import game from './game';
import nextScreen from '../functions/nextScreen';
import gameRules from '../gameRules';
import currentState from '../currentState';

const welcome = () => {
  const welcomeView = new WelcomeView();
  welcomeView.startGame = () => {
    game();
    const endgame = () => {
      currentState.status = `lose`;
      result();
    };
    const timeout = () => setTimeout(endgame, gameRules.gameTime);
    currentState.startTime = new Date().getTime();
    currentState.timer = timeout();
    nextScreen();
  };
  const main = document.querySelector(`.app .main`);
  render(main, welcomeView.element);
  currentState.rightAnswerCount = 0;
  currentState.answerCount = gameRules.gamesNumber;
  currentState.livesLeft = gameRules.lives;
};

export default welcome;
