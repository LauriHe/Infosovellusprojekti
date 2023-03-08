/**
 * @module backgroundResizer
 */

const body = document.body;
const html = document.documentElement;

/**
 * Resize the background image to fit the page
 *
 * @param {object} background
 */

function resizeBackground(background) {
  const pageHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.offsetHeight
  );
  background.style.height = pageHeight + 16 + 'px';
}

export default resizeBackground;
