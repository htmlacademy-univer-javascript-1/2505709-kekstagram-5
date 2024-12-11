const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-error',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error',
});

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.trim().toLowerCase().split(/\s+/);

  const isValidTag = (tag) =>
    tag.startsWith('#') &&
    tag.length > 1 &&
    tag.length <= 20 &&
    /^[a-zа-яё0-9]+$/i.test(tag.slice(1));

  const uniqueTags = new Set(hashtags);

  return (
    hashtags.length <= 5 &&
    hashtags.every(isValidTag) &&
    hashtags.length === uniqueTags.size
  );
};

const getHashtagErrorMessage = (value) => {
  if (!value) {
    return '';
  }
  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }
  const isValidTag = (tag) =>
    tag.startsWith('#') &&
    tag.length > 1 &&
    tag.length <= 20 &&
    /^[a-zа-яё0-9]+$/i.test(tag.slice(1));
  if (!hashtags.every(isValidTag)) {
    return 'Хэш-тег должен начинаться с # и содержать только буквы и цифры. Максимум 20 символов';
  }
  const uniqueTags = new Set(hashtags);
  if (hashtags.length !== uniqueTags.size) {
    return 'Хэш-теги не должны повторяться';
  }

  return '';
};

const validateDescription = (value) => value.length <= 140;

const getDescriptionErrorMessage = () =>
  'Комментарий не должен превышать 140 символов';

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  getHashtagErrorMessage
);

pristine.addValidator(
  descriptionInput,
  validateDescription,
  getDescriptionErrorMessage
);

hashtagsInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

descriptionInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    // eslint-disable-next-line no-alert
    alert('Форма содержит ошибки');
  }
});
