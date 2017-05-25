(function () {
  const KEY_CODE = {
    left: 37,
    right: 39
  };
  const app = document.querySelector(`.app`);
  const sectionMain = app.querySelector(`.main`);
  const templates = document.querySelector(`#templates`).content;
  const welcomeScreen = templates.querySelector(`.main--welcome`);
  const artistScreen = templates.querySelector(`.main--level-artist`);
  const genreScreen = templates.querySelector(`.main--level-genre`);
  const loseScreen = templates.querySelectorAll(`.main--result`)[0];
  const winScreen = templates.querySelectorAll(`.main--result`)[1];
  const screenArray = [];
  screenArray.push(welcomeScreen, artistScreen, genreScreen, loseScreen, winScreen);
  function screenRender(screenNumber) {
    sectionMain.innerHTML = ``;
    sectionMain.appendChild(screenArray[screenNumber]);
  }
  const startScreen = 0;
  let currentScreen = startScreen;
  screenRender(startScreen);
  const nextScreenRender = function () {
    currentScreen++;
    if (currentScreen >= screenArray.length) {
      currentScreen = 0;
    } screenRender(currentScreen);
    return currentScreen;
  };
  const prevScreenRender = function () {
    currentScreen--;
    if (currentScreen < 0) {
      currentScreen = screenArray.length - 1;
    } screenRender(currentScreen);
    return currentScreen;
  };
  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === KEY_CODE.right && evt.altKey) {
      nextScreenRender();
    }
  });
  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === KEY_CODE.left && evt.altKey) {
      prevScreenRender();
    }
  });
})();
