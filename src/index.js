import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import getRoomStatus from './modules/getRoom';

// register service worker
registerSW();
console.log(getRoomStatus('KMD557', '2023-2-28T16:00', '2023-2-28T13:00'));
