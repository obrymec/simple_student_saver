/**
* @project Simple Student Saver - https://obrymec.github.io/simple_student_saver
* @fileoverview The main application entry point.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2022-10-29
* @updated 2023-10-29
* @version 0.0.1
* @file main.js
*/

// Custom dependencies.
import {toastConfigs} from "./front_end/src/utils/std.js";
import {clearStr} from "./front_end/src/utils/string.js";

// Listens browser
// `offline` event.
window.addEventListener (
  "offline", () => Toastify ({
    ...toastConfigs,
    text: clearStr (`
      Your browser has just 
      been taken off the 
      network.
    `)
  }).showToast ()
);

// Listens browser
// `online` event.
window.addEventListener (
  "online", () => Toastify ({
    ...toastConfigs,
    callback: () => {
      // Refreshes navigator.
      window.location.reload ();
    },
    text: clearStr (`
      The browser comes to get 
      access to internet.
    `)
  }).showToast ()
);

// Whether the detected link
// point to the students
// data web page.
if (
  clearStr (
    window.location.href,
    true
  ).toLowerCase ().replace (
    / /g, ''
  ).endsWith ("students")
) {
  // Loads all saved students
  // data web page.
  $ ("main.content").load (
    clearStr (`
      ./front_end/src/features
      /fetch_students/data.html
    `, true)
  );
// Otherwise.
} else {
  // Loads student sign
  // up web page.
  $ ("main.content").load (
    clearStr (`
      ./front_end/src/features
      /add_student/sign_up.html
    `, true)
  );
}
