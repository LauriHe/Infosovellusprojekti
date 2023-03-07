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

const getConfig = () => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  if (settings) {
    config.lang = settings.lang;
    config.campus = settings.campus;
    config.searchRadius = settings.searchRadius;
  }
};

getConfig();

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
      displaySettingsPage();
      break;
    default:
      break;
  }
};

displayPage(currentPage);

const createNavbar = () => {
  const body = document.body;

  const navbar = document.createElement('div');
  navbar.classList.add('navbar');

  const lunchButton = document.createElement('button');
  lunchButton.classList.add('navbar-button');
  const lunchIcon = document.createElement('i');
  lunchIcon.classList.add('fa-solid', 'fa-utensils');
  lunchButton.appendChild(lunchIcon);

  lunchButton.addEventListener('click', () => {
    if (!(currentPage === 'lunch')) {
      currentPage = 'lunch';
      displayPage('lunch');
    }
  });

  const divider = document.createElement('div');
  divider.classList.add('navbar-divider');

  const hslButton = document.createElement('button');
  hslButton.classList.add('navbar-button');
  const hslIcon = document.createElement('i');
  hslIcon.classList.add('fa-solid', 'fa-bus-simple');
  hslButton.appendChild(hslIcon);

  hslButton.addEventListener('click', () => {
    if (!(currentPage === 'hsl')) {
      currentPage = 'hsl';
      displayPage('hsl');
    }
  });

  const divider2 = document.createElement('div');
  divider2.classList.add('navbar-divider');

  const yleButton = document.createElement('button');
  yleButton.classList.add('navbar-button');
  const yleIcon = document.createElement('i');
  yleIcon.classList.add('fa-solid', 'fa-newspaper');
  yleButton.appendChild(yleIcon);

  yleButton.addEventListener('click', () => {
    if (!(currentPage === 'news')) {
      currentPage = 'news';
      displayPage('news');
    }
  });

  const divider3 = document.createElement('div');
  divider3.classList.add('navbar-divider');

  const settingsButton = document.createElement('button');
  settingsButton.classList.add('navbar-button');
  const settingsIcon = document.createElement('i');
  settingsIcon.classList.add('fa-solid', 'fa-gear');
  settingsButton.appendChild(settingsIcon);

  settingsButton.addEventListener('click', () => {
    currentPage = 'settings';
    displayPage('settings');
  });

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
