/**
 * Mapbox map functions
 *
 * @module map
 *
 * @requires module:mapbox-gl
 */

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

let map;

/**
 *
 * Renders a Mapbox map
 *
 * @param {object} mapElement
 * @param {Array} activeCoords
 */

const renderMap = (mapElement, activeCoords) => {
  console.log(typeof mapElement);
  mapboxgl.accessToken =
    'pk.eyJ1IjoibDR0ZSIsImEiOiJjbGVsam1nb2cwbG1nM3ZvZHZnNW1xdTFyIn0.dAyRz-rWWNr144ETVEsJRg';
  map = new mapboxgl.Map({
    container: mapElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [activeCoords[1], activeCoords[0]],
    zoom: 15,
  });
};

/**
 * Deletes all markers from the map
 */

const deleteMarkers = () => {
  const markers = document.querySelectorAll('.mapboxgl-marker');
  markers.forEach((marker) => {
    marker.remove();
  });
};

/**
 * Adds a marker to the map
 * @param {Array} coords
 */

const addMarker = (coords) => {
  const marker = new mapboxgl.Marker()
    .setLngLat([coords[1], coords[0]])
    .addTo(map);
};

export {renderMap, deleteMarkers, addMarker};
