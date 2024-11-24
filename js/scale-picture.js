function scalePicture(previewImg, scaleValue, getScale, setScale) {
  return (evt) => {
    const target = evt.target;

    let scaleChange = 0;
    if (target.classList.contains('scale__control--smaller')) {
      scaleChange = -0.25;
    } else if (target.classList.contains('scale__control--bigger')) {
      scaleChange = +0.25;
    }

    const newScale = getScale() + scaleChange;
    if (newScale >= 0.25 && newScale <= 1) {
      setScale(newScale); // Обновляем текущий масштаб
    }

    scaleValue.value = `${getScale() * 100}%`;
    previewImg.style.transform = `scale(${getScale()})`;
  };
}

export { scalePicture };

