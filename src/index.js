import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import resizeBackground from './modules/backgroundResizer';
import getFazerMenu from './modules/fazer';
import getSodexoMenu from './modules/sodexo';
import {doFetch} from './modules/network';
import campuses from './modules/campuses';

let lang;
let activeCampus;

const getLunchMenu = async () => {
  const menu =
    campuses[activeCampus].restaurant === 'fazer'
      ? await getFazerMenu(campuses[activeCampus].index, lang)
      : await getSodexoMenu(campuses[activeCampus].index, lang);
  return menu;
};

const renderCards = async (cardContainer) => {
  const menu = await getLunchMenu();

  menu.forEach((day) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const date = document.createElement('h3');
    date.innerHTML = day.date;

    card.appendChild(date);

    Object.entries(day.courses).forEach((course) => {
      const courseName = document.createElement('p');
      courseName.innerHTML = course[1].name;

      const courseProperties = document.createElement('p');
      courseProperties.innerHTML = course[1].properties;

      const coursePrice = document.createElement('p');
      coursePrice.innerHTML = course[1].price;

      const div = document.createElement('div');

      div.appendChild(courseName);
      div.appendChild(courseProperties);
      div.appendChild(coursePrice);

      card.appendChild(div);
    });

    cardContainer.appendChild(card);
  });
};

const getConfig = async () => {
  return await doFetch(
    'https://users.metropolia.fi/~lauhei/Web-teknologiat-ja-media-alustat/Projekti/dsconfig.JSON',
    true
  );
};

const initializeLunchPage = async () => {
  // Get config and set global variables
  const config = await getConfig();
  lang = config.lang;
  activeCampus = config.campus;

  const body = document.body;
  body.innerHTML = '';

  const background = document.createElement('div');
  background.classList.add('background');

  // Resize background when window is resized
  onresize = () => resizeBackground(background);

  const heading = document.createElement('h1');
  // eslint-disable-next-line quotes
  heading.innerHTML = lang === 'en' ? "this week's menu" : 'Viikon ruokalista';

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  body.appendChild(background);
  body.appendChild(heading);
  body.appendChild(cardContainer);

  renderCards(cardContainer);
};

initializeLunchPage();

// Register service worker
registerSW();
