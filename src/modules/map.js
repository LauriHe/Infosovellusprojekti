/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

let map;

const renderMap = (mapElement, activeCoords) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibDR0ZSIsImEiOiJjbGVsam1nb2cwbG1nM3ZvZHZnNW1xdTFyIn0.dAyRz-rWWNr144ETVEsJRg';
  map = new mapboxgl.Map({
    container: mapElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [activeCoords[1], activeCoords[0]],
    zoom: 15,
  });
};

const deleteMarkers = () => {
  const markers = document.querySelectorAll('.mapboxgl-marker');
  markers.forEach((marker) => {
    marker.remove();
  });
};

const addMarker = (coords) => {
  const marker = new mapboxgl.Marker()
    .setLngLat([coords[1], coords[0]])
    .addTo(map);
};

export {renderMap, deleteMarkers, addMarker};
