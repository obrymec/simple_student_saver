/**
* @project Simple Student Saver - https://simple-student-saver.onrender.com
* @fileoverview The controller to animate error 404 text.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2023-10-29
* @updated 2024-04-30
* @file error_404.js
* @version 0.0.1
*/

// Animates `Error 404` text message.
animateText ({
  text: "Error 404",
  interval: 50,
  target: (
    document.querySelector (
      "h1#error-404-text"
    )
  )
});
