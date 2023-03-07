import resizeBackground from './backgroundResizer';
import campuses from './campuses';
import {getHslStopsByCoords, getHslScedules} from './hsl';
import {renderMap, addMarker, deleteMarkers} from './map';

let activeCampus;
let searchRadius;
let activeCoords;
let lang;


// render data to page
const renderData = async (mapElement, cardContainer, background) => {
  // get stops for desired coordinates within search radius
  let stops = await getHslStopsByCoords(activeCoords, searchRadius);
  stops = stops.slice(0, 5);

  // index for stops array
  let stopIndex = 0;

  const sessionStop = sessionStorage.getItem('stopIndex');
  if (sessionStop) {
    stopIndex = sessionStop;
  }

  // clear card container
  cardContainer.innerHTML = '';

  const stopContainer = document.createElement('div');
  stopContainer.classList.add('hsl-stop-container');

  // create card
  const stopInfoBox = document.createElement('div');
  stopInfoBox.classList.add('hsl-card');

  const selectStops = document.createElement('select');
  selectStops.classList.add('hsl-select-stops');

  for (let i = 0; i < stops.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerHTML = stops[i].name;
    selectStops.appendChild(option);
  }

  if (sessionStop) {
    selectStops.value = sessionStop;
  }

  stopContainer.appendChild(selectStops);

  // render schedule for a stop and update map
  const renderStop = async () => {
    // clear card
    stopInfoBox.innerHTML = '';

    // get stop from stops array
    const stop = stops[stopIndex];

    // get schedules for each stop
    const schedules = await getHslScedules(stop.gtfsId);

    // if stop has no schedules, don't create a card
    if (schedules.stoptimesWithoutPatterns.length > 0) {
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
      stopContainer.appendChild(stopInfoBox);
      cardContainer.appendChild(stopContainer);

      // resize background in case card container is larger than window
      resizeBackground(background);

      // delete markers and add new marker
      deleteMarkers();
      addMarker(stop.coords);
      addMarker(activeCoords);
    }
  };
  // render map
  renderMap(mapElement, activeCoords);

  // render first stop and start interval to render next stops
  renderStop();

  selectStops.addEventListener('change', (e) => {
    stopIndex = e.target.value;
    renderStop();
    sessionStorage.setItem('stopIndex', stopIndex);
  });
};

// set variables and create nessesary html elements
const initializeHSLPage = async (config) => {
  // get config and set global variables
  activeCampus = config.campus;
  searchRadius = config.searchRadius;
  lang = config.lang;

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
  heading.innerHTML = lang === 'en' ? `HSL Schedules for ${
    activeCampus.substring(0, 1).toUpperCase() + activeCampus.substring(1).replace('yyrmaki', 'yyrmäki')}` : `HSL Aikataulut ${
      activeCampus.substring(0, 1).toUpperCase() + activeCampus.substring(1).replace('yyrmaki', 'yyrmäki')}`;
  

  const selectStops = document.createElement('select');
  selectStops.classList.add('hsl-select-stops');

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
