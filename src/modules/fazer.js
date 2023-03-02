/**
 * Get Fazer courses
 *
 * @module Fazer
 */

/**
 * Takes the daily menu from Fazer API and returns a formated array of courses
 *
 * @param {string} lang - Desired language
 * @returns Array of courses
 */

import {doFetch} from './network';

const getFazerCourses = async (campus, lang) => {
  // Arrays to store the courses
  let fazerCoursesfi = [];
  let fazerCoursesen = [];
  try {
    // Fetch the daily menu from Sodexo API
    const menuFi = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${campus}&language=fi`,
      true
    );
    // Push the courses to the array
    Object.entries(menuFi.MenusForDays[0].SetMenus).forEach((menu) => {
      fazerCoursesfi.push(menu[1]);
    });

    // Fetch the daily menu from Sodexo API
    const menuEn = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${campus}&language=en`,
      true
    );
    // Push the courses to the array
    Object.entries(menuEn.MenusForDays[0].SetMenus).forEach((menu) => {
      fazerCoursesen.push(menu[1]);
    });

    // Array to store the formated courses
    const courses = [];
    if (lang === 'en') {
      // Loop through courses and format them
      for (let i = 0; i < fazerCoursesen.length; i++) {
        // Store the needed data

        let courseName = fazerCoursesen[i].Components[0].split(' (')[0];
        for (let j = 1; j < fazerCoursesen[i].Components.length; j++) {
          if (fazerCoursesen[i].Components[j] == undefined) {
            break;
          }
          courseName += ', ' + fazerCoursesen[i].Components[j].split(' (')[0];
        }
        const properties = fazerCoursesen[i].Components[0]
          .split(' (')[1]
          .split(')')[0];
        let price = fazerCoursesfi[i].Price.split('/');
        price = price[0] + '€ | ' + price[1] + '€ | ' + price[2] + '€';

        // Create a course object and use the stored data
        const course = {
          name: courseName,
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
        let courseName = fazerCourse.Components[0].split(' (')[0];
        for (let i = 1; i < fazerCourse.Components.length; i++) {
          if (fazerCourse.Components[i] == undefined) {
            break;
          }
          courseName += ', ' + fazerCourse.Components[i].split(' (')[0];
        }
        const properties = fazerCourse.Components[0]
          .split(' (')[1]
          .split(')')[0];
        let price = fazerCourse.Price.split('/');
        price = price[0] + '€ | ' + price[1] + '€ | ' + price[2] + '€';

        const course = {
          name: courseName,
          properties: properties,
          price: price,
        };

        courses.push(course);
      });
      return courses;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getFazerCourses;
