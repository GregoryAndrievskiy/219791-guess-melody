import ArtistView from './artist-view';
import GamePresenter from '../GamePresenter.js';

export default () => {
  const presenter = new GamePresenter();
  const artistView = new ArtistView();
  const timer = presenter.doubleScoreTimer();
  presenter.renderArtist(artistView);
  artistView.getAnswer = (evt) => {
    presenter.checkRadio(evt);
    clearTimeout(timer);
    presenter.nextScreen();
  };
};
