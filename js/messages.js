import { onDocumentKeydown as onDocumentKeydownForForm } from './form.js';

const successMsgBox = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMsgBox = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const successBtn = successMsgBox.querySelector('.success__button');
const errorBtn = errorMsgBox.querySelector('.error__button');

const onDocumentKeydownforMsg = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage();
  }
};

const onOutsideClick = (evt) => {
  const messageBox = document.querySelector('.success__inner') || document.querySelector('.error__inner');
  if (messageBox && !messageBox.contains(evt.target)) {
    closeMessage();
  }
};

function closeMessage() {
  const messageBox = document.querySelector('.success') || document.querySelector('.error');
  if (messageBox) {
    document.body.removeChild(messageBox);
    document.removeEventListener('keydown', onDocumentKeydownforMsg);
    document.removeEventListener('click', onOutsideClick);
  }
  if (messageBox?.classList.contains('error')) {
    document.addEventListener('keydown', onDocumentKeydownForForm);
  }
}

const showSuccessMsg = () => {
  document.body.appendChild(successMsgBox);
  document.addEventListener('keydown', onDocumentKeydownforMsg);
  document.addEventListener('click', onOutsideClick);
};

const showErrorMsg = () => {
  document.body.appendChild(errorMsgBox);
  document.addEventListener('keydown', onDocumentKeydownforMsg);
  document.addEventListener('click', onOutsideClick);
  document.removeEventListener('keydown', onDocumentKeydownForForm);
};

successBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeMessage();
});

errorBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeMessage();
});

export { showSuccessMsg, showErrorMsg };
