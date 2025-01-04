const initSlider = (sliderElement, sliderContainer, effectValue, applyEffect) => {
  sliderContainer.classList.add('hidden');
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
    const effectLevel = document.querySelector('.effect-level__value');
    switch (effect) {
      case 'none':
        sliderContainer.classList.add('hidden');
        break;

      case 'chrome':
        sliderContainer.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
          range: { min: 0, max: 1 },
          start: 1,
          step: 0.1,
        });
        sliderElement.noUiSlider.on('update', (values, handle) => {
          const roundedValue = parseFloat(values[handle]).toFixed(1);
          effectLevel.value = roundedValue;
        });
        break;
      case 'sepia':
        sliderContainer.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
          range: { min: 0, max: 1 },
          start: 1,
          step: 0.1,
        });
        sliderElement.noUiSlider.on('update', (values, handle) => {
          const roundedValue = parseInt(values[handle], 10);
          effectLevel.value = roundedValue;
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
