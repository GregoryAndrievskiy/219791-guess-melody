window.main = function () {
  const app = document.querySelector(`.app`);
  const sectionMain = app.querySelector(`.main`);
  const templates = document.querySelector(`#templates`).content;
  const templatesMainArray = templates.querySelectorAll(`.main`);
  const screenArray = [];
  screenArray.push(templatesMainArray[4], templatesMainArray[3], templatesMainArray[0], templatesMainArray[1], templatesMainArray[2]);
  const screenRender = function (screenNumber) {
    sectionMain.innerHTML = ``;
    sectionMain.appendChild(screenArray[screenNumber]);
  };
  const startScreen = 0;
  let currentScreen = startScreen;
  screenRender(startScreen);
  let nextScreenRender = function () {
    currentScreen++;
    if (currentScreen < screenArray.length) {
      screenRender(currentScreen);
      return currentScreen;
    } currentScreen = 0;
    screenRender(currentScreen);
    return currentScreen;
  };
  let prevScreenRender = function () {
    currentScreen--;
    if (currentScreen >= 0) {
      screenRender(currentScreen);
      return currentScreen;
    } currentScreen = screenArray.length - 1;
    screenRender(currentScreen);
    return currentScreen;
  };
  document.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 39 && evt.altKey) {
      nextScreenRender();
    }
  });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 37 && evt.altKey) {
      prevScreenRender();
    }
  });
}();
