/**
 * Lunch page functionality
 *
 * @module lunch
 *
 * @requires module:backgroundResizer
 * @requires module:fazer
 * @requires module:sodexo
 * @requires module:campuses
 * @requires module:weekday
 */

import resizeBackground from './backgroundResizer';
import getFazerMenu from './fazer';
import getSodexoMenu from './sodexo';
import campuses from './campuses';
import getWeekDay from './weekday';

let lang;
let activeCampus;

/**
 * Get lunch menu from Fazer or Sodexo
 *
 * @returns {Array} Lunch menu
 */

const getLunchMenu = async () => {
  const menu =
    campuses[activeCampus].restaurant === 'fazer'
      ? await getFazerMenu(campuses[activeCampus].index, lang)
      : await getSodexoMenu(campuses[activeCampus].index, lang);
  return menu;
};

/**
 *
 * Render lunch cards to page
 *
 * @param {Array} menu
 * @param {object} cardContainer
 * @param {object} background
 */

const renderCards = async (menu, cardContainer, background) => {
  //Generate dom elements for each lunch course
  //Add course name, properties and price to the elements
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

/**
 * Set global variables and render the basic page structure
 *
 * @param {object} config - Configuration data
 */

const initializeLunchPage = async (config) => {
  // Get config and set global variables
  lang = config.lang;
  activeCampus = config.campus;
  const campusName = activeCampus.substring(0, 1).toUpperCase() + activeCampus.substring(1).replace('yyrmaki', 'yyrmäki'); 

  const body = document.body;
  body.innerHTML = '';

  const background = document.createElement('div');
  background.classList.add('lunch-background');

  // Resize background when window is resized
  onresize = () => resizeBackground(background);

  const weekDay = getWeekDay(lang);

  const heading = document.createElement('h1');
  heading.classList.add('lunch-heading');
  heading.innerHTML =
    // eslint-disable-next-line quotes
    lang === 'en' ? weekDay + "'s Menu " + campusName: weekDay + 'n Ruokalista ' + campusName;

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('lunch-card-container');

  body.appendChild(background);
  body.appendChild(heading);
  body.appendChild(cardContainer);

  // get lunch menu
  const dailyMenu = await getLunchMenu();

  renderCards(dailyMenu, cardContainer, background);
};

export default initializeLunchPage;
