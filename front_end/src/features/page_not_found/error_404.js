/**
* @project Simple Student Saver - https://obrymec.github.io/simple_student_saver
* @fileoverview The controller to animate error 404 text.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2023-10-29
* @updated 2023-10-30
* @file error_404.js
* @version 0.0.1
*/

// Custom dependencies.
import {animateText} from "./front_end/src/utils/anim.js";

// Animates `Error 404`
// text message.
animateText (
  document.querySelector (
    "h1#error-404-text"
  ),
  "Error 404",
  50
);
