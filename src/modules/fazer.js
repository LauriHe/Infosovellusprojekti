/**
 * Get Fazer courses
 *
 * @module Fazer
 */

/**
 * Takes the weekly menu from Fazer API and returns a formated menu
 *
 * @param {string} lang - Desired language
 * @returns Array of courses
 */

import {doFetch} from './network';

const getFazerMenu = async (campusIndex, lang) => {
  // Arrays to store the courses
  let fazerCoursesfi = [];
  let fazerCoursesen = [];

  try {
    // Fetch the weekly menu from Sodexo API
    const MenuFi = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${campusIndex}&language=fi`,
      true
    );
    // Push the courses to the array
    Object.entries(MenuFi.MenusForDays[0].SetMenus).forEach((menu) => {
      fazerCoursesfi.push(menu[1]);
    });

    // Fetch the weekly menu from Sodexo API
    const MenuEn = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${campusIndex}&language=en`,
      true
    );
    // Push the courses to the array
    Object.entries(MenuEn.MenusForDays[0].SetMenus).forEach((menu) => {
      fazerCoursesen.push(menu[1]);
    });

    // Array to store the formated courses
    const courses = [];
    if (lang === 'en') {
      // Loop through courses and format them
      for (let i = 0; i < fazerCoursesen.length; i++) {
        // Store the needed data
        const name = fazerCoursesen[i].Components[0].split(' (')[0];
        const properties = '(' + fazerCoursesen[i].Components[0].split(' (')[1];
        let price = fazerCoursesfi[i].Price.split('/')[0].replace(',', '.');

        // Create a course object and use the stored data
        const course = {
          name: name,
          properties: properties,
          price: price,
        };
        // Push the course to the array
        courses.push(course);
      }
      return courses;
    } else {
      // Same as above but with Finnish data
      fazerCoursesfi.forEach((fazerCourse) => {
        const name = fazerCourse.Components[0].split(' (')[0];
        const properties = '(' + fazerCourse.Components[0].split(' (')[1];
        const price = fazerCourse.Price.split('/')[0].replace(',', '.');

        const course = {
          name: name,
          properties: properties,
          price: price,
        };

        courses.push(course);
      });
      return courses;
    }
  } catch (error) {
    return [];
  }
};

export default getFazerMenu;
