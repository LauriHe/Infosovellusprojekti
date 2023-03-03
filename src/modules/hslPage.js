import resizeBackground from './backgroundResizer';
import campuses from './campuses';
import {getHslStopsByCoords, getHslScedules} from './hsl';
import {renderMap, addMarker, deleteMarkers} from './map';

let activeCampus;
let searchRadius;
let activeCoords;

// render data to page
const renderData = async (mapElement, cardContainer, background) => {
  // get stops for desired coordinates within search radius
  let stops = await getHslStopsByCoords(activeCoords, searchRadius);
  stops = stops.slice(0, 5);

  // index for stops array
  let stopIndex = 0;

  // clear card container
  cardContainer.innerHTML = '';

  // create card
  const stopInfoBox = document.createElement('div');
  stopInfoBox.classList.add('hsl-card');

  // render schedule for a stop and update map
  const renderStop = async () => {
    // clear card
    stopInfoBox.innerHTML = '';

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
      // card heading
      const heading = document.createElement('h3');
      heading.innerHTML = stop.name;
      stopInfoBox.appendChild(heading);

      // display arrival and departure times for each schedule
      Object.entries(schedules.stoptimesWithoutPatterns).forEach((schedule) => {
        // create div for each schedule

        // heading for each schedule
        const headsign = document.createElement('h5');
        headsign.innerHTML = `${schedule[1].headsign}:`;
        // format scheduled arrival time
        const scheduledArrivalSeconds = new Date(0);
        scheduledArrivalSeconds.setSeconds(schedule[1].scheduledArrival);
        const scheduledArrivalTime = scheduledArrivalSeconds
          .toISOString()
          .substring(11, 16);

        // create p element for scheduled arrival time
        const div2 = document.createElement('div');
        const scheduledArrival = document.createElement('p');
        scheduledArrival.innerHTML = 'Scheduled arrival: ';
        const scheduledArrival2 = document.createElement('time');
        scheduledArrival2.innerHTML = `${scheduledArrivalTime}`;

        // format scheduled departure time
        const scheduledDepartureSeconds = new Date(0);
        scheduledDepartureSeconds.setSeconds(schedule[1].scheduledDeparture);
        const scheduledDepartureTime = scheduledDepartureSeconds
          .toISOString()
          .substring(11, 16);

        // create p element for scheduled departure time
        const scheduledDeparture = document.createElement('p');
        scheduledDeparture.innerHTML = 'Scheduled departure:';
        const scheduledDeparture2 = document.createElement('time');
        scheduledDeparture2.innerHTML = ` ${scheduledDepartureTime}`;

        // append elements to div

        div2.appendChild(scheduledArrival);
        div2.appendChild(scheduledArrival2);
        div2.appendChild(scheduledDeparture);
        div2.appendChild(scheduledDeparture2);

        // append div to card
        stopInfoBox.appendChild(headsign);
        stopInfoBox.appendChild(div2);
      });

      // append card to card container
      cardContainer.appendChild(stopInfoBox);

      // resize background in case card container is larger than window
      resizeBackground(background);

      // delete markers and add new marker
      deleteMarkers();
      addMarker(stop.coords);
    }
  };
  // render map
  renderMap(mapElement, activeCoords);

  // render first stop and start interval to render next stops
  renderStop();
};

// set variables and create nessesary html elements
const initializeHSLPage = async (config) => {
  // get config and set global variables
  activeCampus = config.campus;
  searchRadius = config.searchRadius;

  // get coordinates for active campus from campuses.JSON
  activeCoords = [
    campuses[activeCampus].location.split(',')[0],
    campuses[activeCampus].location.split(',')[1],
  ];

  const container = document.querySelector('.container');
  container.innerHTML = '';

  const background = document.createElement('div');
  background.classList.add('hsl-background');

  // Resize background when window is resized
  onresize = () => resizeBackground(background);

  // Create heading
  const heading = document.createElement('h1');
  heading.classList.add('hsl-heading');
  heading.innerHTML = `HSL Schedules for ${
    activeCampus.substring(0, 1).toUpperCase() + activeCampus.substring(1)
  }`;

  const mapContainer = document.createElement('div');
  mapContainer.classList.add('map-container');

  const mapElement = document.createElement('div');
  mapElement.id = 'map';

  mapContainer.appendChild(mapElement);

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('hsl-card-container');

  const main = document.createElement('main');
  main.classList.add('hsl-main');
  main.appendChild(mapContainer);
  main.appendChild(cardContainer);

  container.appendChild(background);
  container.appendChild(heading);
  container.appendChild(main);

  renderData(mapElement, cardContainer, background);
};

export default initializeHSLPage;
