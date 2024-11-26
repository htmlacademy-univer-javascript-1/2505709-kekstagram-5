import {PhotoDiscriptionList} from './create-photo-discription.js';

const pictureTempate = document.querySelector('#picture').content;
const pictureArea = document.querySelector('.pictures');

const pictureListFragment = document.createDocumentFragment();

PhotoDiscriptionList.forEach(({url,description,likes,comments})=>{
  const newPicture = pictureTempate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__img').alt = description;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  pictureListFragment.appendChild(newPicture);
});

pictureArea.appendChild(pictureListFragment);
