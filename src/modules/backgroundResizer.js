const body = document.body;
const html = document.documentElement;

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
