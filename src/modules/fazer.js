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
  try {
    // Fetch the weekly menu from Sodexo API
    const MenuFi = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${campusIndex}&language=fi`,
      true
    );

    // Fetch the weekly menu from Sodexo API
    const MenuEn = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${campusIndex}&language=en`,
      true
    );

    console.log(MenuFi);

    let fazerMenu = [];

    if (lang === 'en') {
      Object.entries(MenuEn.MenusForDays).forEach((menu) => {
        fazerMenu.push(menu[1].SetMenus);
      });
    } else {
      Object.entries(MenuFi.MenusForDays).forEach((menu) => {
        fazerMenu.push(menu[1].SetMenus);
      });
    }

    fazerMenu = fazerMenu.slice(0, 5);

    const menu = [];
    let dayIndex = 0;

    console.log(fazerMenu);

    // Loop through each day
    fazerMenu.forEach((day) => {
      // Array to store the formated courses
      const formatedDay = {
        date: 0,
        courses: [],
      };

      switch (dayIndex) {
        case 0:
          lang === 'en'
            ? (formatedDay.date = 'Monday')
            : (formatedDay.date = 'Maanantai');
          break;
        case 1:
          lang === 'en'
            ? (formatedDay.date = 'Tuesday')
            : (formatedDay.date = 'Tiistai');
          break;
        case 2:
          lang === 'en'
            ? (formatedDay.date = 'Wednesday')
            : (formatedDay.date = 'Keskiviikko');
          break;
        case 3:
          lang === 'en'
            ? (formatedDay.date = 'Thursday')
            : (formatedDay.date = 'Torstai');
          break;
        case 4:
          lang === 'en'
            ? (formatedDay.date = 'Friday')
            : (formatedDay.date = 'Perjantai');
          break;
        default:
          break;
      }

      dayIndex++;

      console.log(day);

      //let courseIndex = 0;
      // Format each days courses
      day.forEach((course) => {
        //courseIndex++;
        // Store the needed data
        const name = course.Components[0].split(' (')[0];
        const properties = '(' + course.Components[0].split(' (')[1] + '(';
        let price;
        if (lang === 'en') {
          price = course.Price;
        } else {
          price = course.Price;
        }
        //console.log(MenuFi);

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

export default getFazerMenu;
