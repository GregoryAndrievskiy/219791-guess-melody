import elementCreator from './elementCreator';
import render from './render';
import gameData from './gameData';
import gameRules from './gameRules';
import currentState from './currentState';
import renderNextScreen from './renderNextScreen';

const getRnd = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

let bank = {};

let dataTrans = (data) => {
  let mixUrl = [];
  let mixArtist = [];
  let indexBank = [0, 1, 2, 3];
  const randOrd = () => {
    return (Math.round(Math.random()) - 0.5);
  };
  const gameBank = indexBank.sort(randOrd).splice(0, gameRules.artistsNumber);

  gameBank.forEach((i) => {
    mixArtist.push(data.artist[i]);
    mixUrl.push(data.url[i]);
  });

  bank = {
    artist: mixArtist,
    url: mixUrl
  };

  return bank;
};

const artistTemplate = (data) => `
  <section class="main main--level main--level-artist">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">2</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-wrap">
      <div class="main-timer"></div>
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">
    ${data.artist.map((name) =>
  `<div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${data.artist.indexOf(name)}" name="answer" value="val-${data.artist.indexOf(name)}" />
    <label class="main-answer" for="answer-${data.artist.indexOf(name)}">
      <img class="main-answer-preview" src="">
      ${name}
    </label>
    </div>`).join(``)}
      </form>
  </section>
    </div>
`;

const content = (data) => elementCreator(artistTemplate(data));

export default {
  render: () => {
    render(content(dataTrans(gameData)));
    const answer = document.querySelectorAll(`.app .main .main-answer`);
    const playerWrapper = document.querySelector(`.player-wrapper`);
    let rnd = getRnd(0, bank.url.length - 1);
    window.initializePlayer(playerWrapper, bank.url[rnd]);
    answer.forEach((item) => {
      item.onclick = (evt) => {
        if (evt.target.parentNode.parentNode.querySelector(`input`).value === `val-${rnd}`) {
          currentState.rightAnswerCount++;
        }
        renderNextScreen();
      };
    });
  },
  answerCount: currentState.rightAnswerCount
};
