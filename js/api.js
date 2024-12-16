const getData = () => fetch(
  'https://29.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok){
      return response.json();
    }
    throw new Error();
  })
  .catch(() =>{
    throw new Error('Не удалось загрузить данные. Попробуйте обновить страницу');
  });

const sendData = (formData) => fetch(
  'https://29.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (response.ok){
      return response.json();
    }
    throw new Error();
  })
  .catch(() => {
    throw new Error('Не удалось отправить данные. Попробуйте ещё раз.');
  });

export {getData, sendData};
