import './draw-pictures.js';
import './draw-big-picture.js';
import './form.js';
import './form-validation.js';
import './user-picture.js';
import { setUserFormSubmit } from './submit-form.js';
import { closeOverlay} from './form.js';
import { showSuccessMsg, showErrorMsg } from './messages.js';

const onSuccessSubmit = () => {
  closeOverlay();
  showSuccessMsg();
};

const onErrorSubmit = () => {
  showErrorMsg();
};

setUserFormSubmit(onSuccessSubmit, onErrorSubmit);

