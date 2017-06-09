import elementCreator from './elementCreator';
import questionArtist from './questionArtist';
import screenTimer from './screenTimer';

const artistTemplate = (data) => `
  <section class="main main--level main--level-artist">
    ${screenTimer}
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">
        ${data.artist.reduce((previousValue, currentItem, index) => {
          return previousValue + questionArtist(currentItem, index);
        }, ``)}
      </form>
    </div>
  </section>`;

export default (data) => elementCreator(artistTemplate(data));
