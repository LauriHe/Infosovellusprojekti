/**
 * Shows the current campus
 *
 * @module displayCampus
 */

/**
 * Displays the campus name and logo
 *
 * @param {string} campus - Campus code
 * @param {string} lang - Desired language
 */

const displayCampus = (campus, lang) => {
  const body = document.body;
  body.innerHTML = '';
  body.classList.add('body-container');

  // add campus name to the page
  const heading = document.createElement('h1');
  heading.classList.add('campus-heading');
  // change the first letter to uppercase and replace 'a' to 'ä' in 'myyrmäki'.
  heading.innerHTML = `${
    campus.substring(0, 1).toUpperCase() +
    campus.substring(1).replace('yyrmaki', 'yyrmäki')
  }`;

  // add campus logo to the page
  const logo = document.createElement('img');
  logo.classList.add('metropoliaLogo');
  // eslint-disable-next-line quotes
  lang === 'en'
    ? (logo.src = './assets/images/logo-en.webp')
    : (logo.src = './assets/images/logo-fi.webp');

  body.appendChild(heading);
  body.appendChild(logo);
};

export default displayCampus;
