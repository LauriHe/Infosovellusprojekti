/**
 * Returns weekday name based on language code
 *
 * @module weekday
 * @requires module:network
 *
 * @param {string} lang - Language code
 * @returns Weekday name
 */

import {getWeekdayIndex} from './network';

const getWeekDay = (lang) => {
  // Get the index of the weekday
  const index = getWeekdayIndex();

  // English and Finnish weekday arrays
  const weekdaysEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekdaysFi = [
    'Maanantai',
    'Tiistai',
    'Keskiviikko',
    'Torstai',
    'Perjantai',
  ];

  // Return the weekday name based on the language code
  const weekdays = lang === 'en' ? weekdaysEn : weekdaysFi;
  return weekdays[index];
};

export default getWeekDay;
