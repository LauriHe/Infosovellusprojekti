import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import resizeBackground from './modules/backgroundResizer';
// import getNews from './modules/getNews';

const initializeNewsPage = async () => {
  const body = document.body;
  body.innerHTML = '';

  const background = document.createElement('div');
  background.classList.add('background');

  // Resize background when window is resized
  onresize = () => resizeBackground(background);

  // Create heading
  const heading = document.createElement('h1');
  heading.id ='news-header';
  heading.innerHTML = 'Yle - News';

  // Create boxes for News Summaries and articles
  const newsSummary = document.createElement('div');
  newsSummary.classList.add('newsSummary', 'newsContainer');

  const newsArticle = document.createElement('div');
  newsArticle.classList.add('newsArticle', 'newsContainer');


  //Create main and format the page
  const main = document.createElement('main');

  main.appendChild(newsSummary);
  main.appendChild(newsArticle);

  body.appendChild(background);
  body.appendChild(heading);
  body.appendChild(main);
};

initializeNewsPage();

// register service worker
registerSW();
