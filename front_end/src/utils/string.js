/**
* @project Simple Student Saver - https://simple-student-saver.onrender.com/
* @fileoverview Defines common methods for string treatment.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-11-12
* @file string.js
* @version 1.0.1
*/

/**
 * @description Removes noise chars
 *  from a literal string.
 * @param {String} input The string
 *  to clear.
 * @param {boolean=} clearSpaces
 *  Whether we wish to remove
 *  all available spaces on
 *  the string.
 * @function clearStr
 * @public
 * @returns {String} String
 */
function clearStr (
  input, clearSpaces = false
) {
  // Returns the cleared
  // shape of the given
  // input string.
  return input.replace (
    /[\n\t]/g, ''
  ).trim ().replace (
    (clearSpaces ? /\s/g : ''),
    ''
  );
}

/**
 * @description Capitalizes
 *  the given string.
 * @param {String} text An
 *  input value.
 * @function capitalize
 * @public
 * @returns {?String} ?String
 */
function capitalize (text) {
  // Wether the given
  // value is valid.
  if (!isset (text)) {
    // The final result.
    let result = '';
    // The text's parts.
    text = text.split (' ');
    // Capitalizing parts.
    text.forEach (
      (string, index) => {
        // Capitalizes the
        // current part.
        string = (
          string[0].toUpperCase ()
          + string.replace (
            string[0], ''
          ).toLowerCase ()
        );
        // Builds the result
        // for each part.
        result = (
          (index === 0) ? string
          : `${result} ${string}`
        );
      }
    );
    // Returns the
    // final result.
    return result;
  }
  // Returns `null`
  // for other cases.
  return null;
}
