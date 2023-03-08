/**
 * Gets stops and schedules from Digitransit API
 *
 * @module hsl
 */

/**
 * Get stops by coordinates and radius
 *
 * @param {Array} coords
 * @param {integer} radius
 * @returns Stops object
 */

const getHslStopsByCoords = async (coords, radius) => {
  // GraphQL query
  const data = JSON.stringify({
    query: `{
        stopsByRadius(lat:${coords[0]}, lon:${coords[1]}, radius:${radius}) {
          edges {
            node {
              stop {
                gtfsId
                name
                lat
                lon
              }
              distance
            }
          }
        }
      }`,
  });

  // fetch Digitransit API
  const response = await fetch(
    'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }
  );

  // parse response
  const json = await response.json();

  // format response
  const stops = json.data.stopsByRadius.edges.map((edge) => {
    return {
      name: edge.node.stop.name,
      gtfsId: edge.node.stop.gtfsId,
      distance: edge.node.distance,
      coords: [edge.node.stop.lat, edge.node.stop.lon],
    };
  });

  return stops;
};

/**
 *
 * @param {integer} stopId
 * @returns Schedules object
 */
const getHslScedules = async (stopId) => {
  // GraphQL query
  const data = JSON.stringify({
    query: `{
      stop(id: "${stopId}") {
        name
        stoptimesWithoutPatterns {
          scheduledArrival
          scheduledDeparture
          headsign
          trip {
            route {
              shortName
            }
          }
        }
      }
    }`,
  });

  // fetch Digitransit API
  const response = await fetch(
    'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }
  );

  // parse response
  const json = await response.json();

  return json.data.stop;
};

export {getHslStopsByCoords, getHslScedules};
