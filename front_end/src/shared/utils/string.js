/**
* @project Simple Student Saver - https://www.google.com
* @fileoverview Defines common methods for string
*   treatment.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-07-26
* @file string.js
* @version 1.0.0
*/

/**
 * @description Capitalizes the
 *  given string.
 * @param {String} text An input
 *  value.
 * @function capitalize
 * @public
 * @returns {?String} ?String
 */
function capitalize (text) {
  // Wether the given value
  // is valid.
  if (!isset (text)) {
    // The final result.
    let result = String ('');
    // The text's parts.
    text = text.split (' ');
    // Capitalizing parts.
    text.forEach ((string, index) => {
      // Capitalizes the
      // current part.
      string = (
        string[0].toLocaleUpperCase () +
        string.replace (string[0], '')
      );
      // Builds the result
      // for each part.
      result = (
        (index === 0) ? string
        : `${result} ${string}`
      );
    });
    // Returns the final result.
    return result;
  }
  // Returns `null` for other
  // cases.
  return null;
}
