import { showOverlay } from './form.js';

const uploadImgBtn = document.querySelector('#upload-file');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

uploadImgBtn.addEventListener('change', () => {
  const file = uploadImgBtn.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const fileSrc = URL.createObjectURL(file);
    showOverlay(fileSrc);
  }
});
