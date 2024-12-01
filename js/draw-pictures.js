import { getData } from './api.js';
import { showAlert } from './util.js';
const pictureTemplate = document.querySelector('#picture').content;
const pictureArea = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

getData()
  .then((photoDescriptionList) => {
    photoDescriptionList.forEach(({ url, description, likes, comments }) => {
      const newPicture = pictureTemplate.cloneNode(true);
      newPicture.querySelector('.picture__img').src = url;
      newPicture.querySelector('.picture__img').alt = description;
      newPicture.querySelector('.picture__likes').textContent = likes;
      newPicture.querySelector('.picture__comments').textContent = comments.length;
      pictureListFragment.appendChild(newPicture);
    });
    pictureArea.appendChild(pictureListFragment);
  })
  .catch((err) => {
    showAlert(err.message);
  });

