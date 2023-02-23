const body = document.body;

const displaySlides = (slidePaths, switchInterval) => {
  let slideIndex = 0;
  body.innerHTML = '';
  const slide = document.createElement('div');
  slide.classList.add('slide');

  const displaySlide = () => {
    const slidePath = Object.entries(slidePaths)[slideIndex][1];
    slide.style.backgroundImage = `url(${slidePath})`;
    body.appendChild(slide);
  };
  displaySlide();
  slideIndex = 1;

  const interval = setInterval(() => {
    displaySlide();
    slideIndex += 1;
    if (slideIndex === Object.keys(slidePaths).length) {
      slideIndex = 0;
      clearInterval(interval);
    }
  }, switchInterval);
};

export default displaySlides;
