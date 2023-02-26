/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const renderMap = (mapElement, activeCoords, stopCoords) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibDR0ZSIsImEiOiJjbGVsam1nb2cwbG1nM3ZvZHZnNW1xdTFyIn0.dAyRz-rWWNr144ETVEsJRg';
  const map = new mapboxgl.Map({
    container: mapElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [activeCoords[1], activeCoords[0]],
    zoom: 15,
  });

  const marker1 = new mapboxgl.Marker()
    .setLngLat([stopCoords[1], stopCoords[0]])
    .addTo(map);
};

export default renderMap;
