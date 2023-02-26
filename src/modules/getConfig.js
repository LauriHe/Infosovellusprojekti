import {doFetch} from './network';

const getConfig = async () => {
  return await doFetch(
    'https://users.metropolia.fi/~lauhei/Web-teknologiat-ja-media-alustat/Projekti/dsconfig.JSON',
    true
  );
};

export default getConfig;
