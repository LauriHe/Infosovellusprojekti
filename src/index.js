/**
 * @file index.js
 * @fileoverview Main file of the application.
 *
 * @requires module:serviceWorker
 * @requires module:getConfig
 * @requires module:displaySlides
 * @requires module:lunch
 * @requires module:hslPage
 * @requires module:newsPage
 * @requires module:displayCampus
 * @requires module:customSlide
 */

import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import getConfig from './modules/getConfig';
import displaySlides from './modules/displaySlides';
import initializeLunchPage from './modules/lunch';
import initializeHSLPage from './modules/hslPage';
import initializeNewsPage from './modules/newsPage';
import displayCampus from './modules/displayCampus';
import customSlide from './modules/customSlide';

/**
 * Display the pages in the order specified in the dsconfig.JSON file.
 */

const displayPages = async () => {
  // Get the configuration file
  const config = await getConfig();
  const pages = config.pages;

  // page index
  let i = 0;

  /**
   * Call the correct function to display the page.
   * Set a timeout and call the function again to display the next page.
   *
   * @param {string} page
   */
  const displayPage = (page) => {
    switch (page.name) {
      case 'custom':
        customSlide(page.imageSource);
        break;
      case 'campus':
        displayCampus(config.campus, config.lang);
        break;
      case 'slides':
        displaySlides(page.slideDuration);
        console.log('slides');
        break;
      case 'lunch':
        initializeLunchPage(config);
        console.log('lunch');
        break;
      case 'hsl':
        initializeHSLPage(config, page.stopDuration, page.pageDuration);
        console.log('hsl');
        break;
      case 'news':
        initializeNewsPage(config.lang, page.newsTime, page.pageDuration);
        console.log('news');
        break;
      default:
        break;
    }

    // Display the next page after the specified duration
    setTimeout(
      () => displayPage(pages[i]),
      parseInt(pages[i].pageDuration * 1000)
    );

    // Increment the page index and reset it if it is the last page
    if (i < Object.entries(pages).length - 1) {
      i++;
    } else {
      i = 0;
    }
  };

  displayPage(pages[i]);
};

displayPages();

// register service worker
registerSW();
