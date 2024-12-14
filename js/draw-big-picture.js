import { getRandomInteger } from './util.js';
import { getData } from './api.js';
import { getComments } from './draw-comments.js';
const pictureArea = document.querySelector('.pictures');
const bigPictureWrap = document.querySelector('.big-picture');

const body = document.querySelector('body');
const bigPictureExitBtn = bigPictureWrap.querySelector('.big-picture__cancel');


pictureArea.addEventListener('click', (evt)=>{
  if (evt.target.classList.contains('picture__img')){
    const currentPicture = evt.target.closest('.picture');
    openBigPicture(currentPicture);
  }
});

const getPhoto = (data) => {
  const bigPhoto = bigPictureWrap.querySelector('.big-picture__img');
  bigPhoto.querySelector('img').src = data.url;
};

const getPictureInfo = (data) => {
  const pictureInfo = bigPictureWrap.querySelector('.social__header');
  pictureInfo.querySelector('img').src = `img/avatar-${getRandomInteger(1,6)}.svg`;
  pictureInfo.querySelector('.social__caption').textContent = data.description;
  pictureInfo.querySelector('.likes-count').textContent = data.likes;
};

const onDocumentKeydown = (evt) =>{
  if (evt.key === 'Escape'){
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture(picture){
  getData()
    .then((PhotoDescriptionList) => {
      const absolutePathToPicture = picture.querySelector('img').src;
      const pictureData = PhotoDescriptionList.find((photo) => photo.url === new URL(absolutePathToPicture).pathname.slice(1));

      bigPictureWrap.classList.remove('hidden');
      body.classList.add('modal-open');

      getPhoto(pictureData);
      getPictureInfo(pictureData);
      getComments(pictureData);

      document.addEventListener('keydown', onDocumentKeydown);
    });
}

bigPictureExitBtn.addEventListener('click',()=>{
  closeBigPicture();
});

function closeBigPicture(){
  bigPictureWrap.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}
