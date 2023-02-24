import './sass/style.scss';
import registerSW from './modules/serviceWorker';
import resizeBackground from './modules/backgroundResizer';
import campuses from './modules/campuses';
import {getHslStopsByCoords, getHslScedules} from './modules/hsl';

const activeCampus = 'arabia';
const searchRadius = 500;

// get coordinates for active campus from campuses.JSON
const activeCoords = [
  campuses[activeCampus].location.split(',')[0],
  campuses[activeCampus].location.split(',')[1],
];

const renderData = async (cardContainer, background) => {
  // get stops for desired coordinates within search radius
  const stops = await getHslStopsByCoords(activeCoords, searchRadius);

  // create cards for each stop
  Object.entries(stops).forEach(async (stop) => {
    // get schedules for each stop
    const schedules = await getHslScedules(stop[1].gtfsId);

    // if stop has no schedules, don't create a card
    if (schedules.stoptimesWithoutPatterns.length > 0) {
      // create card
      const card = document.createElement('div');
      card.classList.add('card');

      // card heading
      const heading = document.createElement('h3');
      heading.innerHTML = stop[1].name;
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
  });
};

// create nessesary html elements
const initializeHSLPage = async () => {
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

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  body.appendChild(background);
  body.appendChild(heading);
  body.appendChild(cardContainer);

  renderData(cardContainer, background);
};

initializeHSLPage();

// register service worker
registerSW();
