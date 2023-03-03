import slidePaths from './slidePaths';

const container = document.querySelector('.container');

const displaySlides = async (slideDuration) => {
  const switchInterval = parseInt(slideDuration) * 1000;

  let slideIndex = 0;
  container.innerHTML = '';
  const slide = document.createElement('div');
  slide.classList.add('slide');

  const displaySlide = () => {
    const slidePath = Object.entries(slidePaths)[slideIndex][1];
    slide.style.backgroundImage = `url(${slidePath})`;
    container.appendChild(slide);
  };

  displaySlide();
  slideIndex = 1;

  const interval = setInterval(() => {
    displaySlide();
    slideIndex += 1;
    if (slideIndex === Object.keys(slidePaths).length) {
      clearInterval(interval);
    }
  }, switchInterval);
};

export default displaySlides;
