import resizeBackground from './backgroundResizer';
import getNews from './getNews';

const initializeNewsPage = async () => {
  let pageNumber = 0;

  const sessionPage = sessionStorage.getItem('newsPage');

  if (sessionPage) {
    pageNumber = sessionPage;
  }

  //News headlines and articles for Kotimaa news
  const newsKotimaa = await getNews(102);

  const newsKotimaaHeadings =
    newsKotimaa.teletext.page.subpage[0].content[0].line;

  const newsPageNumbers = [];
  const newsPageHeadings = [];
  let headingContainer = [];

  //Creates arrays with pages numbers and headings
  for (let i = 5; i < newsKotimaaHeadings.length - 2; i++) {
    if (!(newsKotimaaHeadings[i].Text == undefined)) {
      if (!isNaN(parseInt(newsKotimaaHeadings[i].Text.split(' ')[1]))) {
        newsPageNumbers.push(newsKotimaaHeadings[i].Text.split(' ')[1]);
        newsPageHeadings.push(
          newsKotimaaHeadings[i].Text.substring(
            5,
            newsKotimaaHeadings[i].Text.length
          )
        );
      }
    }
  }

  //creates headings to the left column
  const newsSummary = document.createElement('select');
  newsSummary.classList = 'selectBar';

  newsSummary.addEventListener('change', (e) => {
    pageNumber = e.target.value;
    sessionStorage.setItem('newsPage', pageNumber);
    changeArticle();
  });

  for (let j = 0; j < newsPageHeadings.length; j++) {
    const newHeadingText = document.createElement('option');
    newHeadingText.value = j;
    newHeadingText.classList.add('headingLines');
    newHeadingText.innerHTML = newsPageHeadings[j];
    newsSummary.appendChild(newHeadingText);
  }

  if (sessionPage) {
    newsSummary.value = sessionPage;
  }

  //creates articles to the right column
  const articleContainer = document.createElement('div');

  const changeArticle = async () => {
    const articleArray = await getNews(newsPageNumbers[pageNumber]);
    const article = articleArray.teletext.page.subpage[0].content[0].line;
    const articleClean = [];

    //Picks article lines from the array
    for (let i = 0; i < article.length; i++) {
      if (!(article[i].Text == undefined)) {
        articleClean.push(article[i].Text);
      }
    }

    //Creates the article to the right column
    articleContainer.classList = 'containerCenter';
    articleContainer.innerHTML = '';
    articleClean.forEach((line) => {
      const newsArticleLine = document.createElement('p');
      newsArticleLine.id = 'articleLines';
      newsArticleLine.innerHTML = line;
      articleContainer.appendChild(newsArticleLine);
    });
    headingContainer = document.querySelectorAll('.headingLines');
    headingContainer.forEach((heading) => {
      heading.style.color = 'black';
    });
    headingContainer[pageNumber].style.color = '#00b4c8';
  };

  changeArticle();

  //Creating body and elements
  const container = document.querySelector('.container');
  container.innerHTML = '';

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

  /*   const newsArticleContainer = document.createElement('div');
  newsArticleContainer.classList.add('newsArticle', 'newsContainer'); */

  //Create main and format the page
  const main = document.createElement('main');

  const customSelect = document.createElement('div');
  customSelect.classList.add('customSelect');

  customSelect.appendChild(newsSummary);

  newsSummaryContainer.appendChild(customSelect);
  newsSummaryContainer.appendChild(articleContainer);

  main.appendChild(newsSummaryContainer);
  /*   main.appendChild(newsArticleContainer); */

  container.appendChild(background);
  container.appendChild(heading);
  container.appendChild(main);
};

export default initializeNewsPage;
