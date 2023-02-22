'use strict';

const background = document.querySelector('.background');
const body = document.body;
const html = document.documentElement;

const pageHeight = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.offsetHeight
);
background.style.height = pageHeight + 16 + 'px';

onresize = () => {
  const pageHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.offsetHeight
  );
  background.style.height = pageHeight + 16 + 'px';
};

export default background;
