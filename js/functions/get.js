export const rnd = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

export const randOrd = () => {
  return (Math.round(Math.random()) - 0.5);
};

export const dataTrans = (data, gameType) => {
  let mixUrl = [];
  let mixArtist = [];
  let mixGenre = [];
  const indexBank = [];
  let rand = rnd(0, gameType - 1);
  for (let i = 0; i < data.artist.length; i++) {
    indexBank.push(i);
  }

  const gameBank = indexBank.sort(randOrd).splice(0, gameType);

  gameBank.forEach((i) => {
    mixArtist.push(data.artist[i]);
    mixGenre.push(data.genre[i]);
    mixUrl.push(data.url[i]);
  });

  return {
    artist: mixArtist,
    url: mixUrl,
    genre: mixGenre,
    rnd: rand
  };
};

export const checkedCBsValue = (checkboxes) => {
  const values = [];
  checkboxes.forEach((item) => {
    if (item.checked) {
      values.push(item.value);
    }
  });
  return values;
};

export const rightCBsValue = (checkboxes, data) => {
  const values = [];
  checkboxes.forEach((item) => {
    if (data.genre[item.value] === data.genre[data.rnd]) {
      values.push(item.value);
    }
  });
  return values;
};

export const checkCBs = (checkboxes, data) => {
  return (checkedCBsValue(checkboxes).every((element) => (data.genre[element] === data.genre[data.rnd])) && (rightCBsValue(checkboxes, data).length === checkedCBsValue(checkboxes).length));
};

export const validateForm = (submitButton, checkboxes) => {
  const input = document.getElementsByName(`answer`);
  submitButton.disabled = true;
  input.forEach((item) => {
    item.checked = false;
  });
  input.forEach((item) => {
    item.onclick = () => {
      if (checkboxes.every((element) => !element.checked)) {
        submitButton.disabled = true;
      } else {
        submitButton.disabled = false;
      }
    };
  });
};

export const randomizer = (callbackOne, callbackTwo) => {
  if (Math.random() >= 0.5) {
    callbackOne();
  } else {
    callbackTwo();
  }
};
