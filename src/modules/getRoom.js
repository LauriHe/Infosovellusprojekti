const getRoomStatus = async (startDate, endDate, room) => {
  // GraphQL query
  const data = {
      'startDate':startDate,
      'endDate':endDate,
      'room':room
   }
  ;

  // fetch Digitransit API
  const response = await fetch(
    'https://api.allorigins.win/get?url=https://opendata.metropolia.fi/r1/reservation/search',
    {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': 'Basic' + btoa('vgP4dRRlIc489sj9cLMi: ')
      },
    }
  );

  // parse response
  const json = await response.json();

  // format response

  return json.data;
};

export default getRoomStatus();
