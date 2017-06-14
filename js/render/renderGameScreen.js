import render from '../functions/render';
import screenGame from '../templates/screenGame';

export default () => {
  const main = document.querySelector(`.app .main`);
  render(main, screenGame);
};
