import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import slidePaths from './modules/slidePaths';
import displaySlides from './modules/displaySlides';

const switchInterval = 5000;

displaySlides(slidePaths, switchInterval);

// Register service worker
registerSW();
