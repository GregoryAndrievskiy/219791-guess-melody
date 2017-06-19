import currentState from '../currentState';
import artist from '../screens/artist';
import genre from '../screens/genre';
import Application from '../Application';
import {randomizer, getPassedTime} from './get';

export default () => {
  currentState.answerCount--;
  if (currentState.answerCount < 0 || currentState.livesLeft === 0) {
    currentState.result.answers = currentState.rightAnswerCount;
    currentState.result.time = getPassedTime(currentState.startTime);
    Application.showStats();
    clearTimeout(currentState.timer);
  } else {
    randomizer(genre, artist);
  }
};
