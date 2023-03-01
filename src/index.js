import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import getNews from './modules/getNews';


// register service worker
registerSW();
getNews();

