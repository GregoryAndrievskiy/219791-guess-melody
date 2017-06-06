export default {
  rnd: (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  },
  randOrd: () => {
    return (Math.round(Math.random()) - 0.5);
  }
};
