import resizeBackground from './backgroundResizer';
import getFazerMenu from './fazer';
import getSodexoMenu from './sodexo';
import {doFetch} from './network';
import campuses from './campuses';
import getWeekDay from './weekday';

let lang;
let activeCampus;

const getLunchMenu = async () => {
  const menu =
    campuses[activeCampus].restaurant === 'fazer'
      ? await getFazerMenu(campuses[activeCampus].index, lang)
      : await getSodexoMenu(campuses[activeCampus].index, lang);
  return menu;
};

const renderCards = async (menu, cardContainer, background) => {
  menu.forEach((course) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const courseName = document.createElement('p');
    courseName.innerHTML = course.name;

    const courseProperties = document.createElement('p');
    courseProperties.innerHTML = course.properties;

    const coursePrice = document.createElement('p');
    coursePrice.innerHTML = course.price;

    const propertiesAndPrice = document.createElement('div');
    propertiesAndPrice.classList.add('properties-and-price');
    propertiesAndPrice.appendChild(courseProperties);
    propertiesAndPrice.appendChild(coursePrice);

    card.appendChild(courseName);
    card.appendChild(propertiesAndPrice);
    cardContainer.appendChild(card);
  });
  resizeBackground(background);
};

const getConfig = async () => {
  /*return await doFetch(
    'https://users.metropolia.fi/~lauhei/Web-teknologiat-ja-media-alustat/Projekti/dsconfig.JSON'
  );*/
  return doFetch('assets/dsconfig.JSON');
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

  const weekDay = getWeekDay(lang);

  const heading = document.createElement('h1');

  heading.innerHTML =
    // eslint-disable-next-line quotes
    lang === 'en' ? weekDay + "'s menu" : weekDay + 'n ruokalista';

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  body.appendChild(background);
  body.appendChild(heading);
  body.appendChild(cardContainer);

  const dailyMenu = await getLunchMenu();

  renderCards(dailyMenu, cardContainer, background);
};

export default initializeLunchPage;
