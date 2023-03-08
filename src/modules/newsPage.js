/**
 * News page functionality.
 *
 * @module newsPage
 *
 * @requires module:backgroundResizer
 * @requires module:getNews
 */

import resizeBackground from './backgroundResizer';
import getNews from './getNews';

/**
 * Creates the news page.
 * @param {string} lang - The language of the page.
 * @param {string} newsTime - How long each article is shown in seconds.
 * @param {string} pageTime - How long the page is shown in seconds.
 */

const initializeNewsPage = async (lang, newsTime, pageTime) => {
  //Get news headlines and articles for Kotimaa news
  const newsKotimaa = await getNews(102);

  //Get headings from newsKotimaa
  const newsKotimaaHeadings =
    newsKotimaa.teletext.page.subpage[0].content[0].line;

  const newsPageNumbers = [];
  const newsPageHeadings = [];
  let headingContainer = [];

  //Creates an array of news page numbers
  for (let i = 5; i < newsKotimaaHeadings.length - 2; i++) {
    // Make sure that the heading is not undefined and that the array is not longer than 7
    if (
      !(newsKotimaaHeadings[i].Text == undefined) &&
      newsPageNumbers.length < 7
    ) {
      // Make sure that the first part of the heading is a number
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

  //container for the headings
  const newsSummary = document.createElement('div');
  newsSummary.classList = 'containerCenter';

  //creates headings to the left column
  newsPageHeadings.forEach((heading) => {
    const newHeadingText = document.createElement('h3');
    newHeadingText.classList.add('headingLines');
    newHeadingText.innerHTML = heading;
    newsSummary.appendChild(newHeadingText);
  });

  //container for the articles
  const articleContainer = document.createElement('div');

  //index to keep track of the pages
  let numberi = 0;

  //get index from session storage
  const sessionNumberi = sessionStorage.getItem('ylePage');
  if (sessionNumberi) {
    numberi = sessionNumberi;
  }

  //Changes the article
  const changeArticle = async () => {
    // reset the index if it is the last page
    if (numberi == newsPageNumbers.length) {
      numberi = 0;
    }

    // get the article with the current index
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
  heading.innerHTML = lang === 'en' ? 'Yle - News' : 'Yle - Uutiset';

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

  // interval for changing the article
  const interval = setInterval(await changeArticle, newsTime * 1000);

  //clear interval and save the index to session storage when ylePage is no longer active
  setTimeout(() => {
    clearInterval(interval);
    sessionStorage.setItem('ylePage', numberi);
  }, pageTime * 1000);
};

export default initializeNewsPage;
