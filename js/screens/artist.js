import ArtistView from './artist-view';
import render from '../functions/render';
import nextScreen from '../functions/nextScreen';
import gameRules from '../gameRules';
import currentState from '../currentState';

const artist = () => {
  const artistView = new ArtistView();
  let score = 2;
  const timer = setTimeout(function () {
    score = score / 2;
  }, gameRules.doubleScoreTime);
  const mainWrap = document.querySelector(`.main-wrap`);
  render(mainWrap, artistView.element);
  const playerWrapper = document.querySelector(`.player-wrapper`);
  window.initializePlayer(playerWrapper, currentState.rightAnswer.url[currentState.rightAnswer.rightAnswer]);
  artistView.getAnswer = (evt) => {
    if (evt.target.value === `val-${currentState.rightAnswer.rightAnswer}`) {
      currentState.rightAnswerCount = currentState.rightAnswerCount + score;
    } else {
      currentState.livesLeft--;
    }
    clearTimeout(timer);
    nextScreen();
  };
};

export default artist;
