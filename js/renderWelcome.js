import render from './render';
import renderNextScreen from './renderNextScreen';
import gameRules from './gameRules';
import screenWelcome from './screenWelcome';

export default () => {
  render(screenWelcome(gameRules));
  const play = document.querySelector(`.main-play`);
  play.onclick = () => {
    renderNextScreen();
  };
};
