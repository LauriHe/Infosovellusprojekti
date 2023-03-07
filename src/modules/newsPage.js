import resizeBackground from './backgroundResizer';
import getNews from './getNews';

const initializeNewsPage = async (newsTime, pageTime) => {
  //News headlines and articles for Kotimaa news
  const newsKotimaa = await getNews(102);

  const newsKotimaaHeadings =
    newsKotimaa.teletext.page.subpage[0].content[0].line;

  const newsPageNumbers = [];
  const newsPageHeadings = [];
  let headingContainer = [];

  //Creates arrays with pages numbers and headings
  for (let i = 5; i < newsKotimaaHeadings.length - 2; i++) {
    if (
      !(newsKotimaaHeadings[i].Text == undefined)
    ) {
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

  newsPageHeadings.forEach((heading) => {
    const newHeadingText = document.createElement('option');
    newHeadingText.classList.add('headingLines');
    newHeadingText.innerHTML = heading;
    newsSummary.appendChild(newHeadingText);
  });

  //creates articles to the right column
  const articleContainer = document.createElement('div');

  let numberi = 0;

  const sessionNumberi = sessionStorage.getItem('ylePage');
  if (sessionNumberi) {
    numberi = sessionNumberi;
  }

  const changeArticle = async () => {
    if (numberi == newsPageNumbers.length) {
      numberi = 0;
    }

    const articleArray = await getNews(newsPageNumbers[numberi]);
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
    headingContainer[numberi].style.color = '#00b4c8';
    numberi++;
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

  const interval = setInterval(await changeArticle, newsTime * 1000);
  setTimeout(() => {
    clearInterval(interval);
    sessionStorage.setItem('ylePage', numberi);
  }, pageTime * 1000);
};

export default initializeNewsPage;
