import render from './render';
import renderNextScreen from './renderNextScreen';
import elementCreator from './elementCreator';
import gameData from './gameData';
import gameRules from './gameRules';
import currentState from './currentState';

const getRnd = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

let bank = {};

let dataTrans = (data) => {
  let mixUrl = [];
  let mixGenre = [];
  const indexBank = [];
  let rnd = getRnd(0, gameRules.genreNumber - 1);
  for (let i = 0; i < data.genre.length; i++) {
    indexBank.push(i);
  }

  const randOrd = () => {
    return (Math.round(Math.random())-0.5);
  };

  const gameBank = indexBank.sort(randOrd).splice(0, gameRules.genreNumber);

  gameBank.forEach((i) => {
    mixGenre.push(data.genre[i]);
    mixUrl.push(data.url[i]);
  });

  bank = {
    genre: mixGenre,
    url: mixUrl,
    rndGenre: rnd
  };

  return bank;
};

const genreTemplate = (data) => `
  <section class="main main--level main--level-genre">
    <h2 class="title">Выберите ${bank.genre[bank.rndGenre]} треки</h2>
    <form class="genre">
      ${data.url.map((i) =>
      `<div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="${data.url.indexOf(i)}" id="a-${data.url.indexOf(i)}">
        <label class="genre-answer-check" for="a-${data.url.indexOf(i)}"></label>
      </div>`).join(``)}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </section>
`;

const content = (data) => elementCreator(genreTemplate(data));

export default {
  render: () => {
    render(content(dataTrans(gameData)));
    const input = document.getElementsByName(`answer`);
    const send = document.querySelector(`.genre-answer-send`);
    const playerWrapper = document.querySelectorAll(`.player-wrapper`);
    const chkBoxes = Array.from(document.getElementsByName(`answer`));
    playerWrapper.forEach(function (element, index) {
      window.initializePlayer(element, bank.url[index]);
    });
    send.disabled = true;
    input.forEach((item) => {
      item.checked = false;
    });
    input.forEach((item) => {
      item.onclick = () => {
        if (chkBoxes.every((element) => !element.checked)) {
          send.disabled = true;
        } else {
          send.disabled = false;
        }
      };
    });
    send.onclick = (evt) => {
      evt.preventDefault();
      const checkedCBs = [];
      chkBoxes.forEach((item) => {
        if (item.checked) {
          checkedCBs.push(item.value);
        }
      });
      if (checkedCBs.every((element) => (bank.genre[element] === bank.genre[bank.rndGenre]))) {
        currentState.rightAnswerCount++;
      }
      renderNextScreen();
    };
  },
  answerCount: currentState.rightAnswerCount
};
