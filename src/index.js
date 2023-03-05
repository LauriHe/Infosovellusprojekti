import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import resizeBackground from './modules/backgroundResizer';
import getNews from './modules/getNews';

const initializeNewsPage = async () => {
  //News headlines and articles for Kotimaa news
  const newsKotimaa = await getNews(102);
  const newsKotimaaHeadings =
    newsKotimaa.teletext.page.subpage[0].content[0].line;

  console.log(newsKotimaaHeadings);

  const newsPageNumbers = [];
  const newsPageHeadings = [];

  //Creates arrays with pages numbers and headings
  for (let i = 5; i < newsKotimaaHeadings.length - 2; i++) {
    if (!(newsKotimaaHeadings[i].Text == undefined)) {
      newsPageNumbers.push(newsKotimaaHeadings[i].Text.split(' ')[1]);
      newsPageHeadings.push(
        newsKotimaaHeadings[i].Text.substring(
          5,
          newsKotimaaHeadings[i].Text.length
        )
      );
    }
  }
  console.log(newsPageNumbers);
  console.log(newsPageHeadings);

  //creates headings to the left column
  const newsSummary = document.createElement('div');
  newsSummary.classList = ('containerCenter');

  newsPageHeadings.forEach((heading) => {
    const newHeadingText = document.createElement('h3');
    newHeadingText.id = 'headingLines';
    newHeadingText.innerHTML = heading;
    newsSummary.appendChild(newHeadingText);
  });

  //creates articles to the right column
  //should be inside setInterval()

  const articleArray = await getNews(105);
  const article = articleArray.teletext.page.subpage[0].content[0].line;
  const articleClean = [];

  //Picks article lines from the array
  for (let i = 0; i < article.length; i++) {
    if (!(article[i].Text == undefined)) {
      articleClean.push(article[i].Text);
    }
  }

  //Creates the article to the right column
  const articleContainer = document.createElement('div');
  articleContainer.classList = ('containerCenter');
  articleClean.forEach((line) => {
    const newsArticleLine = document.createElement('p');
    newsArticleLine.id = 'articleLines';
    newsArticleLine.innerHTML = line;
    articleContainer.appendChild(newsArticleLine);
  });

  //Creating body and elements
  const body = document.body;
  body.innerHTML = '';

  const background = document.createElement('div');
  background.id = 'news-Bakcground';
  background.classList.add('background');

  // Resize background when window is resized
  onresize = () => resizeBackground(background);

  // Create heading
  const heading = document.createElement('h1');
  heading.id = 'news-header';
  heading.innerHTML = 'Yle - News';

  // Create boxes for News Summaries and articles
  const newsSummaryContainer = document.createElement('div');
  newsSummaryContainer.classList.add('newsSummary', 'newsContainer');

  const newsArticleContainer = document.createElement('div');
  newsArticleContainer.classList.add('newsArticle', 'newsContainer');

  //Create main and format the page
  const main = document.createElement('main');

  newsSummaryContainer.appendChild(newsSummary);
  newsArticleContainer.appendChild(articleContainer);

  main.appendChild(newsSummaryContainer);
  main.appendChild(newsArticleContainer);

  body.appendChild(background);
  body.appendChild(heading);
  body.appendChild(main);
};

initializeNewsPage();

// register service worker
registerSW();
