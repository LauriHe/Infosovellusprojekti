import resizeBackground from './backgroundResizer';
import getFazerMenu from './fazer';
import getSodexoMenu from './sodexo';
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
    card.classList.add('lunch-card');

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

const initializeLunchPage = async (config) => {
  // Get config and set global variables
  lang = config.lang;
  activeCampus = config.campus;

  const container = document.querySelector('.container');
  container.innerHTML = '';

  const background = document.createElement('div');
  background.classList.add('lunch-background');

  // Resize background when window is resized
  onresize = () => resizeBackground(background);

  const weekDay = getWeekDay(lang);

  const heading = document.createElement('h1');
  heading.classList.add('lunch-heading');

  heading.innerHTML =
    // eslint-disable-next-line quotes
    lang === 'en' ? weekDay + "'s menu" : weekDay + 'n ruokalista';

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('lunch-card-container');

  container.appendChild(background);
  container.appendChild(heading);
  container.appendChild(cardContainer);

  const dailyMenu = await getLunchMenu();

  renderCards(dailyMenu, cardContainer, background);
};

export default initializeLunchPage;
