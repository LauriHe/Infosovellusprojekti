import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import resizeBackground from './modules/backgroundResizer';
import getConfig from './modules/getConfig';
import campuses from './modules/campuses';
import {getHslStopsByCoords, getHslScedules} from './modules/hsl';
import renderMap from './modules/map';

let activeCampus;
let searchRadius;
let activeCoords;

// render data to page
const renderData = async (mapElement, cardContainer, background) => {
  // get stops for desired coordinates within search radius
  let stops = await getHslStopsByCoords(activeCoords, searchRadius);
  stops = stops.slice(0, 5);

  let stopIndex = 0;

  const renderStop = async () => {
    // remove all cards from card container
    cardContainer.innerHTML = '';

    // get stop from stops array
    const stop = stops[stopIndex];

    // increment stop index
    stopIndex += 1;
    // if stop index is larger than stops array length, reset stop index
    if (stopIndex >= stops.length) {
      stopIndex = 0;
    }

    // get schedules for each stop
    const schedules = await getHslScedules(stop.gtfsId);

    // if stop has no schedules, don't create a card
    if (schedules.stoptimesWithoutPatterns.length > 0) {
      // create card
      const card = document.createElement('div');
      card.classList.add('card');

      // card heading
      const heading = document.createElement('h3');
      heading.innerHTML = stop.name;
      card.appendChild(heading);

      // display arrival and departure times for each schedule
      Object.entries(schedules.stoptimesWithoutPatterns).forEach((schedule) => {
        // create div for each schedule
        const div = document.createElement('div');

        // heading for each schedule
        const headsign = document.createElement('p');
        headsign.innerHTML = `${schedule[1].headsign}:`;

        // format scheduled arrival time
        const scheduledArrivalSeconds = new Date(0);
        scheduledArrivalSeconds.setSeconds(schedule[1].scheduledArrival);
        const scheduledArrivalTime = scheduledArrivalSeconds
          .toISOString()
          .substring(11, 16);

        // create p element for scheduled arrival time
        const scheduledArrival = document.createElement('p');
        scheduledArrival.innerHTML = `Scheduled arrival: ${scheduledArrivalTime}`;

        // format scheduled departure time
        const scheduledDepartureSeconds = new Date(0);
        scheduledDepartureSeconds.setSeconds(schedule[1].scheduledDeparture);
        const scheduledDepartureTime = scheduledDepartureSeconds
          .toISOString()
          .substring(11, 16);

        // create p element for scheduled departure time
        const scheduledDeparture = document.createElement('p');
        scheduledDeparture.innerHTML = `Scheduled departure: ${scheduledDepartureTime}`;

        // append elements to div
        div.appendChild(headsign);
        div.appendChild(scheduledArrival);
        div.appendChild(scheduledDeparture);

        // append div to card
        card.appendChild(div);
      });

      // append card to card container
      cardContainer.appendChild(card);

      // resize background in case card container is larger than window
      resizeBackground(background);
    }
    renderMap(mapElement, activeCoords, stop.coords);
  };
  renderStop();
  setInterval(renderStop, 5000);
};

// set variables and create nessesary html elements
const initializeHSLPage = async () => {
  // get config and set global variables
  const config = await getConfig();
  activeCampus = config.campus;
  searchRadius = config.searchRadius;

  // temporary values for testing
  activeCampus = 'myyrmaki';
  searchRadius = 500;

  // get coordinates for active campus from campuses.JSON
  activeCoords = [
    campuses[activeCampus].location.split(',')[0],
    campuses[activeCampus].location.split(',')[1],
  ];

  const body = document.body;
  body.innerHTML = '';

  const background = document.createElement('div');
  background.classList.add('background');

  // Resize background when window is resized
  onresize = () => resizeBackground(background);

  // Create heading
  const heading = document.createElement('h1');
  heading.innerHTML = `HSL Schedules for ${
    activeCampus.substring(0, 1).toUpperCase() + activeCampus.substring(1)
  }`;

  const mapContainer = document.createElement('div');
  mapContainer.classList.add('map-container');

  const mapElement = document.createElement('div');
  mapElement.id = 'map';

  mapContainer.appendChild(mapElement);

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  const main = document.createElement('main');
  main.appendChild(mapContainer);
  main.appendChild(cardContainer);

  body.appendChild(background);
  body.appendChild(heading);
  body.appendChild(main);

  renderData(mapElement, cardContainer, background);
};

initializeHSLPage();

// register service worker
registerSW();
