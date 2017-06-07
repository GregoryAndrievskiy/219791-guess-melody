const rnd = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

const randOrd = () => {
  return (Math.round(Math.random()) - 0.5);
};

const dataTrans = (data, gameType) => {
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

export default {
  rnd,
  randOrd,
  dataTrans
};
