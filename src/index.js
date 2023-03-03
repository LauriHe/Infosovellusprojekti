import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import resizeBackground from './modules/backgroundResizer';
import getConfig from './modules/getConfig';

let activeCampus;

const initializeRoomPage = async () => {

  const config = await getConfig();
  activeCampus = config.campus;

  //for testing
  activeCampus = 'karamalmi';

  //empty the page
  const body = document.body;
  body.innerHTML = '';

  const background = document.createElement('div');
  background.id = 'roomBackground';
  background.classList.add('background');

  // Resize background when window is resized
  onresize = () => resizeBackground(background);

  // Create heading
  const heading = document.createElement('h1');
  heading.id = 'roomHeading';
  heading.innerHTML = `CoWorking spaces for ${
    activeCampus.substring(0, 1).toUpperCase() + activeCampus.substring(1)
  }`;

  //Create main and format the page
  const main = document.createElement('main');

  body.appendChild(background);
  body.appendChild(heading);
  body.appendChild(main);
};

initializeRoomPage();

// register service worker
registerSW();

