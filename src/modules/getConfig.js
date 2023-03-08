/**
 * @module getConfig
 *
 * @requires module:network
 */

/**
 * Get config from JSON file
 *
 * @returns Config object
 */

import {doFetch} from './network';

const getConfig = async () => {
  return doFetch('assets/dsconfig.JSON');
};

export default getConfig;
