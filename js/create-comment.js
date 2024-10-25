import { messageOptions, names } from './data.js';
import { getRandomInteger, createRandomIdFromRangeGenerator } from './util.js';

function createCommentMessage() {
  let message = '';
  if (getRandomInteger(1, 2) === 1) {
    message += messageOptions[getRandomInteger(0, 5)];
  } else {
    const generateCommentId = createRandomIdFromRangeGenerator(0, 5);
    message += `${messageOptions[generateCommentId()]} ${ messageOptions[generateCommentId()]}`;
  }
  return (message);
}

const generateUserId = createRandomIdFromRangeGenerator(1, 1000);

function createComment() {
  const comment = {
    'id': generateUserId(),
    'avatar': `img/avatar-${getRandomInteger(1, 6)}.svg`,
    'message': createCommentMessage(),
    'name': names[getRandomInteger(0, names.length - 1)]
  };
  return comment;
}

export {createComment};
