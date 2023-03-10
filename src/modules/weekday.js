import {getWeekdayIndex} from './network';

const getWeekDay = (lang) => {
  // Get the index of the current weekday
  const index = getWeekdayIndex();
  // Create an array of weekdays in English and Finnish
  const weekdaysEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekdaysFi = [
    'Maanantai',
    'Tiistai',
    'Keskiviikko',
    'Torstai',
    'Perjantai',
  ];
  // Return the weekday in the correct language
  const weekdays = lang === 'en' ? weekdaysEn : weekdaysFi;
  return weekdays[index];
};

export default getWeekDay;
