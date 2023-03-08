/**
 * Display the slides specified in slidePaths file.
 *
 * @module displaySlides
 *
 * @requires module:slidePaths
 */

import slidePaths from './slidePaths';

const body = document.body;

/**
 * Displays the slideshow.
 *
 * @param {integer} slideDuration - Duration of each slide in seconds
 */

const displaySlides = async (slideDuration) => {
  // how long each slide is shown in milliseconds
  const switchInterval = parseInt(slideDuration) * 1000;

  let slideIndex = 0;

  body.innerHTML = '';

  const slide = document.createElement('div');
  slide.classList.add('slide');

  // display a slide according to the slideIndex
  const displaySlide = () => {
    const slidePath = Object.entries(slidePaths)[slideIndex][1];
    slide.style.backgroundImage = `url(${slidePath})`;
    body.appendChild(slide);
  };

  displaySlide();
  slideIndex = 1;

  // interval for displaying the slides
  const interval = setInterval(() => {
    displaySlide();
    slideIndex += 1;
    if (slideIndex === Object.keys(slidePaths).length) {
      clearInterval(interval);
    }
  }, switchInterval);
};

export default displaySlides;
