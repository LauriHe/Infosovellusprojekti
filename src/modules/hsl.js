// get stops for given coordinates and radius
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
    };
  });

  return stops;
};

// get next schedules for given stop
const getHslScedules = async (stopId) => {
  // GraphQL query
  const data = JSON.stringify({
    query: `{
      stop(id: "${stopId}") {
        name
          stoptimesWithoutPatterns {
          scheduledArrival
          realtimeArrival
          arrivalDelay
          scheduledDeparture
          realtimeDeparture
          departureDelay
          realtime
          realtimeState
          serviceDay
          headsign
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
