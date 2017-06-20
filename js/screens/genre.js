import GenreView from './genre-view';
import GamePresenter from '../GamePresenter.js';

export default () => {
  const presenter = new GamePresenter();
  const genreView = new GenreView();
  const timer = presenter.doubleScoreTimer();
  presenter.renderGenre(genreView);
  presenter.validateAnswer();
  genreView.getAnswer = (evt) => {
    evt.preventDefault();
    presenter.checkBox();
    clearTimeout(timer);
    presenter.nextScreen();
  };
};
