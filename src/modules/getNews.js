const getNews = async (pageNumber) => {
  // fetch Digitransit API
  const response = await fetch(
    `https://external.api.yle.fi/v1/teletext/pages/${pageNumber}.json?app_id=app_id=012eb4a3&app_key=7c003448101267562ed42d931b5ed214`,
    {
      method: 'get',
    }
  );
  // parse response
  const json = await response.json();

  return json;
};

export default getNews;
