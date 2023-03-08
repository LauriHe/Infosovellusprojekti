import {doFetch} from './network';

// get config from JSON file
const getConfig = async () => {
  return doFetch('assets/dsconfig.JSON');
};

export default getConfig;
