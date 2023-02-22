import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import resizeBackground from './modules/backgroundResizer';
import getFazerMenu from './modules/fazer';
import getSodexoMenu from './modules/sodexo';

const lang = 'en';
const activeCampus = 'myllypuro';

const campuses = {
  arabia: {
    restaurant: 'fazer',
    index: '1251',
  },
  karamalmi: {
    restaurant: 'fazer',
    index: '3208',
  },
  myllypuro: {
    restaurant: 'sodexo',
    index: '158',
  },
  myyrmäki: {
    restaurant: 'sodexo',
    index: '152',
  },
};

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

const initializeLunchPage = () => {
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
