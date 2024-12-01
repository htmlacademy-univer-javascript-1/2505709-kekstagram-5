function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const showAlert = (message) => {
  const container = document.createElement('div');
  container.style.zIndex = '3';
  container.style.position = 'absolute';
  container.style.left = '0';
  container.style.top = '0';
  container.style.right = '0';
  container.style.padding = '10px 3px';
  container.style.fontSize = '30px';
  container.style.textAlign = 'center';
  container.style.backgroundColor = 'red';

  container.textContent = message;
  document.body.append(container);

  setTimeout(()=>{
    container.remove();
  }, 5000);
};

export {showAlert, getRandomInteger, createRandomIdFromRangeGenerator};

