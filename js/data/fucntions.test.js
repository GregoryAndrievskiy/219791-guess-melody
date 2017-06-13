import assert from 'assert';
import {checkCBs} from '../functions/get';

const data = Object.freeze(
    {
      genre: [`Хип-хоп и рэп`, `Классические`, `Кантри и фолк`, `Поп`, `Классические`, `Кантри и фолк`],
      rnd: `4`
    }
);

const checkboxes = Object.freeze([
  {
    value: `1`,
    checked: true
  },
  {
    value: `4`,
    checked: true
  },
]);

describe(`Answers for genre`, () => {

  it(`true if all checked answers are correct`, () => {
    assert(checkCBs(checkboxes, data));
  });

  it(`false if one of answers is incorrect`, () => {
    const newCBs = checkboxes.slice();
    newCBs[1].value = `3`;
    assert.equal(false, checkCBs(newCBs, data));
  });

  it(`false if all correct answers was not selected`, () => {
    const cbs = checkboxes.slice();
    cbs.checked = false;
    assert.equal(false, checkCBs(cbs, data));
  });
});
