const getRoomStatus = async (startDate, endDate, room) => {
  // GraphQL query
  const data = {
      startDate:startDate,
      endDate:endDate,
      room:room
   };

  // fetch Digitransit API
  const response = await fetch(
    'https://opendata.metropolia.fi/r1/reservation/search',
    {
      method: 'post',
      body:JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('vgP4dRRlIc489sj9cLMi:')
      },
    }
  );
  // parse response
  const json = await response.json();

  // format response
  console.log(json);
  return json.data;
};

console.log(getRoomStatus('2023-2-28T13:00', '2023-2-28T16:00', ['KMD557']));

export default getRoomStatus();
