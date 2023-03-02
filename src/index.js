import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import initializeLunchPage from './modules/lunch';

initializeLunchPage();

// Register service worker
registerSW();
