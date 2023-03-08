import slidePaths from './slidePaths';

const container = document.querySelector('.container');

// Display slides specified in slidePaths.js
const displaySlides = async (slideDuration) => {
  const switchInterval = parseInt(slideDuration) * 1000;

  let slideIndex = 0;
  container.innerHTML = '';

  const slide = document.createElement('div');
  slide.classList.add('slide');

  // display slide according to slideIndex
  const displaySlide = () => {
    const slidePath = Object.entries(slidePaths)[slideIndex][1];
    slide.style.backgroundImage = `url(${slidePath})`;
    container.appendChild(slide);
  };

  displaySlide();
  slideIndex = 1;

  // interval for switching slides
  const interval = setInterval(() => {
    displaySlide();
    slideIndex += 1;
    if (slideIndex === Object.keys(slidePaths).length) {
      clearInterval(interval);
    }
  }, switchInterval);
};

export default displaySlides;
