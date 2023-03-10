import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import initializeLunchPage from './modules/lunch';
import initializeHSLPage from './modules/hslPage';
import initializeNewsPage from './modules/newsPage';
import displaySettingsPage from './modules/settingsPage';

let currentPage = 'lunch';

const config = {
  lang: 'fi',
  campus: 'myllypuro',
  searchRadius: '500',
};

// get the config from local storage
const getConfig = () => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  if (settings) {
    config.lang = settings.lang;
    config.campus = settings.campus;
    config.searchRadius = settings.searchRadius;
  }

  if (config.searchRadius === '') {
    config.searchRadius = 500;
  }
};

getConfig();

// call the correct page function based on the current page
const displayPage = (currentPage) => {
  getConfig();
  switch (currentPage) {
    case 'lunch':
      initializeLunchPage(config);
      break;
    case 'hsl':
      initializeHSLPage(config);
      break;
    case 'news':
      initializeNewsPage(config);
      break;
    case 'settings':
      displaySettingsPage(config);
      break;
    default:
      break;
  }
};

displayPage(currentPage);

// Create navbar and add event listeners
const createNavbar = () => {
  const body = document.body;

  const navbar = document.createElement('div');
  navbar.classList.add('navbar');

  // button for lunch page
  const lunchButton = document.createElement('button');
  lunchButton.classList.add('navbar-button');
  const lunchIcon = document.createElement('i');
  lunchIcon.classList.add('fa-solid', 'fa-utensils');
  lunchButton.appendChild(lunchIcon);

  // add event listener to lunch button
  lunchButton.addEventListener('click', () => {
    if (!(currentPage === 'lunch')) {
      getConfig();
      currentPage = 'lunch';
      displayPage('lunch');
    }
  });

  // divider between buttons
  const divider = document.createElement('div');
  divider.classList.add('navbar-divider');

  // button for hsl page
  const hslButton = document.createElement('button');
  hslButton.classList.add('navbar-button');
  const hslIcon = document.createElement('i');
  hslIcon.classList.add('fa-solid', 'fa-bus-simple');
  hslButton.appendChild(hslIcon);

  // add event listener to hsl button
  hslButton.addEventListener('click', () => {
    if (!(currentPage === 'hsl')) {
      getConfig();
      currentPage = 'hsl';
      displayPage('hsl');
    }
  });

  // divider between buttons
  const divider2 = document.createElement('div');
  divider2.classList.add('navbar-divider');

  // button for news page
  const yleButton = document.createElement('button');
  yleButton.classList.add('navbar-button');
  const yleIcon = document.createElement('i');
  yleIcon.classList.add('fa-solid', 'fa-newspaper');
  yleButton.appendChild(yleIcon);

  // add event listener to news button
  yleButton.addEventListener('click', () => {
    if (!(currentPage === 'news')) {
      getConfig();
      currentPage = 'news';
      displayPage('news');
    }
  });

  // divider between buttons
  const divider3 = document.createElement('div');
  divider3.classList.add('navbar-divider');

  // button for settings page
  const settingsButton = document.createElement('button');
  settingsButton.classList.add('navbar-button');
  const settingsIcon = document.createElement('i');
  settingsIcon.classList.add('fa-solid', 'fa-gear');
  settingsButton.appendChild(settingsIcon);

  // add event listener to settings button
  settingsButton.addEventListener('click', () => {
    currentPage = 'settings';
    displayPage('settings');
  });

  // append all elements to navbar
  navbar.appendChild(lunchButton);
  navbar.appendChild(divider);
  navbar.appendChild(hslButton);
  navbar.appendChild(divider2);
  navbar.appendChild(yleButton);
  navbar.appendChild(divider3);
  navbar.appendChild(settingsButton);
  body.appendChild(navbar);
};

createNavbar();

// register service worker
registerSW();
