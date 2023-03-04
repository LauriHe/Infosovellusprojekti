import {getWeekdayIndex} from './network';

const getWeekDay = (lang) => {
  const index = getWeekdayIndex();
  const weekdaysEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekdaysFi = [
    'Maanantai',
    'Tiistai',
    'Keskiviikko',
    'Torstai',
    'Perjantai',
  ];
  const weekdays = lang === 'en' ? weekdaysEn : weekdaysFi;
  return weekdays[index];
};

export default getWeekDay;
