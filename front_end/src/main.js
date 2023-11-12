/**
* @project Simple Student Saver - https://simple-student-saver.onrender.com/
* @fileoverview The main application entry point.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2022-10-29
* @updated 2023-11-12
* @version 0.0.2
* @file main.js
*/

// Global attributes.
window.toastConfigs = {
  gravity: "bottom",
  stopOnFocus: true,
  position: "left",
  duration: 3000,
  close: true,
  style: {
    background: "steelblue",
    color: "#fff"
  }
};

// When the page is loaded.
$ (document).ready (() => {
  // Listens browser `offline`
  // event.
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
  // Listens browser `online`
  // event.
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
    // Loads student sign up
    // web page.
    $ ("main.content").load (
      clearStr (`
        ./front_end/src/features
        /add_student/sign_up.html
      `, true)
    );
  }
});
