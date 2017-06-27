import assert from 'assert';
import {checkCheckboxes} from '../functions/get';

const data = Object.freeze(
    {
      "genre": `blues`,
    }
);

const checkboxes = Object.freeze([
  {
    value: `blues`,
    checked: true
  },
  {
    value: `pop`,
    checked: false
  },
  {
    value: `rock`,
    checked: false
  },
  {
    value: `rnb`,
    checked: false
  },
]);

describe(`Answers for genre`, () => {

  it(`true if all checked answers are correct`, () => {
    assert(checkCheckboxes(checkboxes, data));
  });

  it(`false if one of answers is incorrect`, () => {
    const newCBs = checkboxes.slice();
    newCBs[3].checked = true;
    assert.equal(false, checkCheckboxes(newCBs, data));
  });

  it(`false if all correct answers was not selected`, () => {
    const cbs = checkboxes.slice();
    cbs[0].checked = false;
    cbs[2].checked = true;
    cbs[2].value = `blues`;
    assert.equal(false, checkCheckboxes(cbs, data));
  });
});
