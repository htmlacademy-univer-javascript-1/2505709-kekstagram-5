//всё реализовано в module9-task1
const initSlider = (sliderElement, sliderContainer, effectValue, applyEffect) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    const intensity = sliderElement.noUiSlider.get();
    effectValue.value = intensity;
    applyEffect(intensity);
  });

  const updateSliderSettings = (effect) => {
    switch (effect) {
      case 'none':
        sliderContainer.classList.add('hidden');
        break;

      case 'chrome':
      case 'sepia':
        sliderContainer.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
          range: { min: 0, max: 1 },
          start: 1,
          step: 0.1,
        });
        break;

      case 'marvin':
        sliderContainer.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
          range: { min: 0, max: 100 },
          start: 100,
          step: 1,
        });
        break;

      case 'phobos':
        sliderContainer.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
          range: { min: 0, max: 3 },
          start: 3,
          step: 0.1,
        });
        break;

      case 'heat':
        sliderContainer.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
          range: { min: 1, max: 3 },
          start: 3,
          step: 0.1,
        });
        break;
    }
  };

  return updateSliderSettings;
};
export {initSlider};
