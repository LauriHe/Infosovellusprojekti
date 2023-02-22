/**
 * Get Sodexo courses
 *
 * @module sodexo
 */

/**
 * Takes the weekly menu from Sodexo API and returns a formated array of courses
 *
 * @param {string} lang - Desired language
 * @returns Array of courses
 */

import {doFetch} from './network';

const getSodexoMenu = async (campusIndex, lang) => {
  // Array to store the courses
  let sodexoMenu = [];
  try {
    // Fetch the weekly menu from Sodexo API
    const weeklyMenu = await doFetch(
      `https://www.sodexo.fi/ruokalistat/output/weekly_json/${campusIndex}`
    );

    // Push the courses to the array
    Object.entries(weeklyMenu.mealdates).forEach((day) => {
      sodexoMenu.push(day[1]);
    });

    // Array to store the formated courses
    const menu = [];

    // Loop through each day
    sodexoMenu.forEach((day) => {
      // Array to store the formated courses
      const formatedDay = {
        date: day.date,
        courses: [],
      };

      if (lang === 'en') {
        switch (day.date) {
          case 'Maanantai':
            formatedDay.date = 'Monday';
            break;
          case 'Tiistai':
            formatedDay.date = 'Tuesday';
            break;
          case 'Keskiviikko':
            formatedDay.date = 'Wednesday';
            break;
          case 'Torstai':
            formatedDay.date = 'Thursday';
            break;
          case 'Perjantai':
            formatedDay.date = 'Friday';
            break;
          default:
            break;
        }
      }

      // Format each days courses
      Object.entries(day.courses).forEach((course) => {
        // Store the needed data
        const name = eval('course[1].title_' + lang);
        const properties = course[1].properties;
        const price = course[1].price;

        // Create a course object and use the stored data
        const formatedCourse = {
          name: name,
          properties: properties,
          price: price,
        };

        // Push the formated courses to the array
        formatedDay.courses.push(formatedCourse);
      });
      menu.push(formatedDay);
    });
    return menu;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getSodexoMenu;
