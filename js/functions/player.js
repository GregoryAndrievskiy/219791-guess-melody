const switchState = (state, player) => {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
};

export const initializePlayer = (element, file, autoplay = false, controllable = true) => {
  let state = {};
  const content = document.querySelector(`template`)
    .content
    .querySelector(`.player`)
    .cloneNode(true);
  const player = content.querySelector(`audio`);
  const button = content.querySelector(`button`);
  player.onloadeddata = () => {
    if (controllable) {
      button.onclick = () => switchState(state, player, content);
    }
    if (autoplay) {
      switchState(state, player);
    }
  };
  player.src = file;
  element.appendChild(content);
  element.classList.toggle(`player--no-controls`, !controllable);
};
