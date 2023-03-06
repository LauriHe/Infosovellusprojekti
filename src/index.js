import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import getConfig from './modules/getConfig';
import displaySlides from './modules/displaySlides';
import initializeLunchPage from './modules/lunch';
import initializeHSLPage from './modules/hslPage';
import initializeNewsPage from './modules/newsPage';
import displayCampus from './modules/displayCampus';
import customSlide from './modules/customSlide';

const displayPages = async () => {
  const config = await getConfig();
  const pages = config.pages;

  let i = 0;

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
        initializeHSLPage(config, page.stopDuration);
        console.log('hsl');
        break;
      case 'news':
        initializeNewsPage(page.newsTime, page.pageDuration);
        console.log('news');
        break;

      default:
        break;
    }
    setTimeout(
      () => displayPage(pages[i]),
      parseInt(pages[i].pageDuration * 1000)
    );
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
