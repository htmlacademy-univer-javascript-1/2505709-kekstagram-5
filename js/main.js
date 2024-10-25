function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const messageOptions = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Илья', 'Ваня', 'Игорь', 'Маша', 'Саша', 'Алёна', 'Настя', 'Данил'];

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

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);

const generateUrlId = createRandomIdFromRangeGenerator(1, 1000);

function createPhotoDiscription() {
  const PhotoDiscription = {
    'id': generatePhotoId(),
    'url': `photos/${generateUrlId()}.jpg`,
    'description': 'картинка',
    'likes': getRandomInteger(15, 200),
    'comments': Array.from({ length: getRandomInteger(0, 30) }, createComment)
  };
  return PhotoDiscription;
}

const PhotoDiscriptionlist = Array.from({ length: 25 }, createPhotoDiscription);


