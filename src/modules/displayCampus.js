const displayCampus = (campus, lang) => {
  const body = document.body;
  body.innerHTML = '';
  body.classList.add('body-container');

  const heading = document.createElement('h1');
  heading.classList.add('campus-heading');
  heading.innerHTML = `${
    campus.substring(0, 1).toUpperCase() +
    campus.substring(1).replace('yyrmaki', 'yyrmäki')
  }`;
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
