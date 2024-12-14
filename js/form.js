import { initSlider } from './slider.js';
import { scalePicture } from './scale-picture.js';

const form = document.querySelector('.img-upload__form');
const uploadImgBtn = form.querySelector('#upload-file');
const body = document.querySelector('body');
const overlay = form.querySelector('.img-upload__overlay');
const closeOverlayBtn = form.querySelector('#upload-cancel');
const previewImg = overlay.querySelector('.img-upload__preview').querySelector('img');
const scaleWrapper = overlay.querySelector('.img-upload__scale');
const scaleValue = scaleWrapper.querySelector('.scale__control--value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsFieldset = document.querySelector('.img-upload__effects');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

let curImgScale = 1;
let currentEffect = 'none';

const applyEffect = (intensity) => {
  switch (currentEffect) {
    case 'chrome':
      previewImg.style.filter = `grayscale(${intensity})`;
      break;
    case 'sepia':
      previewImg.style.filter = `sepia(${intensity})`;
      break;
    case 'marvin':
      previewImg.style.filter = `invert(${intensity}%)`;
      break;
    case 'phobos':
      previewImg.style.filter = `blur(${intensity}px)`;
      break;
    case 'heat':
      previewImg.style.filter = `brightness(${intensity})`;
      break;
    case 'none':
      previewImg.style.filter = '';
      break;
  }
};

const updateSliderSettings = initSlider(sliderElement, sliderContainer, effectValue, applyEffect);

effectsFieldset.addEventListener('change', (evt) => {
  const target = evt.target;

  if (target.classList.contains('effects__radio')) {
    currentEffect = target.value;

    updateSliderSettings(currentEffect);

    applyEffect(sliderElement.noUiSlider.get());
  }
});

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeOverlay();
  }
};
const showOverlay = (pictureSrc) => {
  previewImg.src = pictureSrc;
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeOverlay(){
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadImgBtn.value = '';

  previewImg.style.transform = 'scale(1)';
  scaleValue.value = '100%';
  curImgScale = 1;

  currentEffect = 'none';
  sliderElement.noUiSlider.updateOptions({
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
  });
  effectValue.value = '100';
  previewImg.style.filter = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
  sliderContainer.classList.add('hidden');
  effectsFieldset.querySelector('input').checked = true;
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeOverlayBtn.addEventListener('click', closeOverlay);

scaleWrapper.addEventListener(
  'click',
  scalePicture(previewImg, scaleValue, () => curImgScale, (newScale) => {
    curImgScale = newScale;
  })
);

export {closeOverlay, onDocumentKeydown, showOverlay};
