/**
 * This file contains the code for the HSL page.
 * @module hslPage
 *
 * @requires module:backgroundResizer
 * @requires module:campuses
 * @requires module:hsl
 * @requires module:map
 */

import resizeBackground from './backgroundResizer';
import campuses from './campuses';
import {getHslStopsByCoords, getHslScedules} from './hsl';
import {renderMap, addMarker, deleteMarkers} from './map';

let activeCampus;
let searchRadius;
let activeCoords;
let stopInterval;
let pageTime;
let lang;

/**
 * Get stops and schedules for a stop
 * render schedules and map to page
 *
 * @param {object} mapElement
 * @param {object} cardContainer
 * @param {object} background
 */

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

        // create p element for scheduled arrival time
        const div2 = document.createElement('div');
        const shortHandNum = document.createElement('p');
        shortHandNum.innerHTML = schedule[1].trip.route.shortName;
        shortHandNum.classList.add('shortHand');

        // format scheduled departure time
        const scheduledDepartureSeconds = new Date(0);
        scheduledDepartureSeconds.setSeconds(schedule[1].scheduledDeparture);
        const scheduledDepartureTime = scheduledDepartureSeconds
          .toISOString()
          .substring(11, 16);

        // create p element for scheduled departure time
        const scheduledDeparture = document.createElement('p');
        scheduledDeparture.innerHTML =
          lang === 'en' ? 'Scheduled departure:' : 'Lähtöaika:';
        const scheduledDeparture2 = document.createElement('time');
        scheduledDeparture2.innerHTML = ` ${scheduledDepartureTime}`;

        // append elements to div

        div2.appendChild(shortHandNum);

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

      // delete markers and add new markers
      deleteMarkers();
      addMarker(stop.coords);
      addMarker(activeCoords);
    }
  };
  // render map
  renderMap(mapElement, activeCoords);

  // render first stop and start interval to render next stops
  renderStop();
  const interval = setInterval(renderStop, stopInterval);
  setTimeout(() => clearInterval(interval), pageTime * 1000);
};

/**
 *
 * Set global variables and render basic page structure
 *
 * @param {object} config - Configuration data
 * @param {string} stopDuration - Duration for each stop in seconds
 * @param {string} pageDuration - Duration for the page in seconds
 */

const initializeHSLPage = async (config, stopDuration, pageDuration) => {
  lang = config.lang;
  // get config and set global variables
  activeCampus = config.campus;
  searchRadius = config.searchRadius;
  pageTime = pageDuration;
  stopInterval = parseInt(stopDuration) * 1000;

  // get coordinates for active campus from campuses.JSON
  activeCoords = [
    campuses[activeCampus].location.split(',')[0],
    campuses[activeCampus].location.split(',')[1],
  ];

  const body = document.body;
  body.innerHTML = '';

  const background = document.createElement('div');
  background.classList.add('hsl-background');

  // Resize background when window is resized
  onresize = () => resizeBackground(background);

  // Create heading
  const heading = document.createElement('h1');
  heading.classList.add('hsl-heading');

  // change the first letter to uppercase and replace 'a' to 'ä' in 'myyrmäki'.
  heading.innerHTML =
    lang === 'en'
      ? `HSL Schedules for ${
          activeCampus.substring(0, 1).toUpperCase() +
          activeCampus.substring(1).replace('yyrmaki', 'yyrmäki')
        }`
      : `HSL Aikataulut ${
          activeCampus.substring(0, 1).toUpperCase() +
          activeCampus.substring(1).replace('yyrmaki', 'yyrmäki')
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

  body.appendChild(background);
  body.appendChild(heading);
  body.appendChild(main);

  renderData(mapElement, cardContainer, background);
};

export default initializeHSLPage;
