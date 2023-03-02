/**
 * Get Sodexo courses
 *
 * @module sodexo
 */

/**
 * Takes the daily menu from Sodexo API and returns a formated array of courses
 *
 * @param {string} lang - Desired language
 * @returns Array of courses
 */

import {doFetch} from './network';

const getSodexoCourses = async (campus, lang) => {
  // Get the current date
  const year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  // Array to store the courses
  let sodexoCourses = [];
  try {
    // Fetch the daily menu from Sodexo API
    const dailyMenu = await doFetch(
      `https://www.sodexo.fi/ruokalistat/output/daily_json/${campus}/${year}-${month}-${day}`
    );
    // Push the courses to the array
    Object.entries(dailyMenu.courses).forEach((course) => {
      sodexoCourses.push(course.pop());
    });
    // Array to store the formated courses
    const courses = [];

    // Same as above but with Finnish data
    sodexoCourses.forEach((sodexoCourse) => {
      const name = eval('sodexoCourse.title_' + lang);
      const properties = sodexoCourse.properties;
      const price = sodexoCourse.price.split('/').join(' | ');

      const course = {
        name: name,
        properties: properties,
        price: price,
      };

      courses.push(course);
    });
    return courses;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getSodexoCourses;
