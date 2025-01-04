import { getData } from './api.js';
import { showAlert } from './util.js';
import { createRandomIdFromRangeGenerator } from './util.js';
import { showFilters, setDefaultFilterClick, setRandomFilterClick, setDiscussedFilterClick } from './pictures-filters.js';
import { debounce } from './util.js';
import { initBigPicture } from './draw-big-picture.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureArea = document.querySelector('.pictures');

const RERENDER_DELAY = 500;

const createPicture = (pictureData) => {
  const newPicture = pictureTemplate.cloneNode(true);
  const newPictureImg = newPicture.querySelector('.picture__img');
  newPictureImg.src = pictureData.url;
  newPictureImg.alt = pictureData.description;
  newPicture.querySelector('.picture__likes').textContent = pictureData.likes;
  newPicture.querySelector('.picture__comments').textContent = pictureData.comments.length;

  newPictureImg.dataset.id = pictureData.id;

  return newPicture;
};

const clearArea = () => {
  Array.from(pictureArea.children).forEach((element) => {
    if (element.classList.contains('picture')){
      pictureArea.removeChild(element);
    }
  });
};

const showAllPictures = (picturesData) => {
  clearArea();
  const pictureListFragment = document.createDocumentFragment();
  picturesData.forEach((pictureData) => {
    const newPicture = createPicture(pictureData);
    pictureListFragment.appendChild(newPicture);
  });
  pictureArea.appendChild(pictureListFragment);
};

const showRandomPictures = (picturesData) => {
  clearArea();
  const pictureListFragment = document.createDocumentFragment();
  const generateRandomIdFunc = createRandomIdFromRangeGenerator(0,picturesData.length);
  for (let i = 0; i < 10; i++){
    const randomId = generateRandomIdFunc();
    picturesData.forEach((pictureData) => {
      if (randomId === pictureData.id){
        const newPicture = createPicture(pictureData);
        pictureListFragment.appendChild(newPicture);
      }
    });
    pictureArea.appendChild(pictureListFragment);
  }
};

const getCommentCount = (element) => {
  const commentElement = element.querySelector('.picture__comments');
  return commentElement ? parseInt(commentElement.textContent, 10) : 0;
};

const sortByComments = (pictureListFragment) => {
  const sortedPicturelistFragment = document.createDocumentFragment();

  Array.from(pictureListFragment.children)
    .sort((elem1, elem2) =>
      getCommentCount(elem2) - getCommentCount(elem1))
    .forEach((element) => {
      sortedPicturelistFragment.appendChild(element);
    });

  return sortedPicturelistFragment;
};

const showDiscussedPictures = (picturesData) => {
  clearArea();
  const pictureListFragment = document.createDocumentFragment();
  picturesData.forEach((pictureData) => {
    const newPicture = createPicture(pictureData);
    pictureListFragment.appendChild(newPicture);
  });
  const sortedPicturelistFragment = sortByComments(pictureListFragment);
  pictureArea.appendChild(sortedPicturelistFragment);
};

getData()
  .then((picturesData) => {
    showAllPictures(picturesData);
    showFilters();
    initBigPicture(picturesData);
    setDefaultFilterClick(debounce(
      () => showAllPictures(picturesData),
      RERENDER_DELAY));
    setRandomFilterClick(debounce(
      () => showRandomPictures(picturesData),
      RERENDER_DELAY));
    setDiscussedFilterClick(debounce(
      () => showDiscussedPictures(picturesData),
      RERENDER_DELAY));
  })
  .catch((err) => {
    showAlert(err.message);
  });


