import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import displaySlides from './modules/displaySlides';
import initializeLunchPage from './modules/lunch';
import initializeHSLPage from './modules/hslPage';

let currentPage = 'lunch';

const config = {
  lang: 'fi',
  campus: 'myllypuro',
  searchRadius: '500',
};

const displayPage = (page, config) => {
  switch (page) {
    case 'slides':
      displaySlides(page.slideDuration);
      break;
    case 'lunch':
      initializeLunchPage(config);
      break;
    case 'hsl':
      initializeHSLPage(config, page.stopDuration);
      break;
    default:
      break;
  }
};

displayPage(currentPage, config);

const createNavbar = () => {
  const body = document.body;

  const navbar = document.createElement('div');
  navbar.classList.add('navbar');

  const lunchButton = document.createElement('button');
  lunchButton.classList.add('navbar-button');
  lunchButton.innerHTML = 'Lounas';

  lunchButton.addEventListener('click', () => {
    if (!(currentPage === 'lunch')) {
      currentPage = 'lunch';
      displayPage('lunch', config);
    }
  });

  const divider = document.createElement('div');
  divider.classList.add('navbar-divider');

  const hslButton = document.createElement('button');
  hslButton.classList.add('navbar-button');
  hslButton.innerHTML = 'HSL';

  hslButton.addEventListener('click', () => {
    if (!(currentPage === 'hsl')) {
      currentPage = 'hsl';
      displayPage('hsl', config);
    }
  });

  navbar.appendChild(lunchButton);
  navbar.appendChild(divider);
  navbar.appendChild(hslButton);
  body.appendChild(navbar);
};

createNavbar();

// register service worker
registerSW();
