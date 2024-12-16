import { pristine } from './form-validation.js';
import { sendData } from './api.js';
import { closeOverlay} from './form.js';
import { showSuccessMsg, showErrorMsg } from './messages.js';
const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');

const onSuccessSubmit = () => {
  closeOverlay();
  showSuccessMsg();
};

const onErrorSubmit = () => {
  const isNeedFullClear = false;
  closeOverlay(isNeedFullClear);
  showErrorMsg();
};


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Отправить';
};

const setUserFormSubmit = (onSuccess, onError) =>{
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid){
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(onError)
        .finally(unblockSubmitButton);
    }
  });
};

setUserFormSubmit(onSuccessSubmit, onErrorSubmit);


