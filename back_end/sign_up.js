/**
* @project Simple Student Saver - https://www.google.com
* @fileoverview Defines all useful methods to
*   manage a students data with a database.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-07-25
* @file sign_up.js
* @version 1.0.0
*/

/**
 * @description Removes noise
 *  characters from a literal
 *  string.
 * @param {String} input The
 *  to clear.
 * @param {boolean} clearSpaces
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
  return (
    input
      ?.replaceAll ('\n', '')
      ?.replaceAll ('\t', '')
      ?.trim ()
  ).replaceAll (
    (clearSpaces ? ' ' : ''),
    ''
  );
}

/**
 * @description Checks whether the given
 *  input is not undefined and null.
 * @param {any} attr An input value.
 * @function isset
 * @public
 * @returns {boolean} boolean
 */
function isset (attr) {
  // The stringify version of
  // the given input.
  const stringify = (
    attr.toString ().trim ()
  );
  // Checks matches.
	return (
    (
      Array.isArray (attr)
      && attr.length <= 0
    )
    || stringify.length <= 0
    || attr === undefined
    || attr === null
  );
}

/**
 * @description Checks the given
 *  student firstname.
 * @param {String} firstname The
 *  student firstname.
 * @function checkFirstName_
 * @private
 * @returns {{
 *   isAccepted: boolean,
 *   firstname?: String,
 *   message?: String
 * }} Object
 */
function checkFirstName_ (firstname) {
  // Removes left and right
  // spaces.
  firstname = firstname.trim ();
  // Whether the firstname
  // is defined.
	if (!isset (firstname)) {
    // Whether the fistname
    // is correct.
    const isCorrect = (
      /([a-zA-ZéÉèÈïÏêÊëËäÄöÖüÜÇ\s]\d?){5,}/
      .test (firstname)
    );
		// Whether the firstname
    // is correct.
		if (isCorrect) {
      // Sends good results.
      return {
        firstname: firstname,
        isAccepted: true
      };
		// Otherwise.
		} else {
			// Sends bad results.
      return {
        isAccepted: false,
        message: clearStr (`
          Le(s) prénom(s) donné(s) 
          ne sont pas correct.
        `)
      };
		}
	// Otherwise.
	} else {
    // Sends bad results.
    return {
      isAccepted: false,
      message: clearStr (`
        Vous n'avez pas donné 
        votre/vos prénom(s).
      `)
    };
	}
}

/**
 * @description Checks the given
 *  student lastname.
 * @param {String} lastname The
 *  student lastname.
 * @function checkLastName_
 * @private
 * @returns {{
 *   isAccepted: boolean,
 *   lastname?: String,
 *   message?: String
 * }} Object
 */
function checkLastName_ (lastname) {
  // Removes left and right
  // spaces.
  lastname = lastname.trim ();
  // Whether the lastname is
  // defined.
  if (!isset (lastname)) {
    // Whether the lastname
    // is correct.
    const isCorrect = (
      /([a-zA-ZéÉèÈïÏêÊëËäÄöÖüÜÇ]\d?){5,}/
      .test (lastname)
    );
    // Whether the lastname
    // is correct.
    if (isCorrect) {
        // Sends good results.
        return {
          lastname: lastname,
          isAccepted: true
        };
    // Otherwise.
    } else {
      // Sends bad results.
      return {
        isAccepted: false,
        message: clearStr (`
          Le nom donné n'est 
          pas correct.
        `)
      };
    }
  // Otherwise.
  } else {
    // Sends bad results.
    return {
      isAccepted: false,
      message: clearStr (`
        Vous n'avez pas donner 
        votre nom de famille.
      `)
    };
  }
}

/**
 * @description Checks the given
 *  student phone number.
 * @param {String} phoneNumber
 *  The student phone number.
 * @function checkPhoneNumber_
 * @private
 * @returns {{
 *   phoneNumber?: String,
 *   isAccepted: boolean,
 *   message?: String
 * }} Object
 */
function checkPhoneNumber_ (phoneNumber) {
  // Removes left and right
  // spaces.
  phoneNumber = phoneNumber.trim ();
  // Whether the phone number
  // is defined.
  if (!isset (phoneNumber)) {
    // Whether the phone number
    // is correct.
    const isCorrect = (
      /^\d{8}$/.test (phoneNumber)
    );
    // Whether the phone number
    // is correct.
    if (isCorrect) {
        // Sends good results.
        return {
          phoneNumber: phoneNumber,
          isAccepted: true
        };
    // Otherwise.
    } else {
      // Sends bad results.
      return {
        isAccepted: false,
        message: clearStr (`
          Votre numéro de téléphone 
          est incorrecte.
        `)
      };
    }
  // Otherwise.
  } else {
    // Sends bad results.
    return {
      isAccepted: false,
      message: clearStr (`
        Vous n'avez pas préciser 
        votre numéro de téléphone.
      `)
    };
  }
}

/**
 * @description Adds the given
 *  student to the database.
 * @param {Object<String, String>} body
 *  The firstname, lastname and phone
 *  number of the student.
 * @param {BetterSqlite3.Database} db
 *  The database reference.
 * @param {Response} res The server's
 *  response.
 * @function addStudent
 * @public
 * @returns {void} void
 */
function addStudent ({
  phoneNumber,
  firstname,
  lastname,
}, db, res) {
  // Checks the firstname.
	let serverData = (
    checkFirstName_ (firstname)
  );
  // Whether there are no errors
  // about the firstname.
  if (serverData.isAccepted) {
    // Checks the lastname.
	  serverData = (
      checkLastName_ (lastname)
    );
    // Whether there are no errors
    // about the lastname.
    if (serverData.isAccepted) {
      // Checks the phone number.
      serverData = (
        checkPhoneNumber_ (
          phoneNumber
        )
      );
      // Whether there are no errors
      // about the phone number.
      if (serverData.isAccepted) {
        // Prepares the student
        // search query.
        const studentData = (
          db?.prepare (
            clearStr (`
              SELECT firstname, lastname 
              FROM Students 
              WHERE firstname = ? 
              AND lastname = ?;
            `)
          )
        );
        // Whether the given isn't
        // defined inside the
        // database again.
        if (
          studentData?.get (
            firstname, lastname
          )?.length <= 0
        ) {
          // Prepares insertion query.
          const insert = (
            db?.prepare (
              clearStr (`
                INSERT INTO Students (
                  firstname,
                  lastname,
                  phoneNumber
                ) VALUES (?, ?, ?);
              `)
            )
          );
          // Runs the prepared
          // SQL request.
          insert?.run (
            firstname,
            lastname,
            phoneNumber
          );
          // Sets the passed student's
          // data state.
          serverData.isExists = false;
        // Otherwise.
        } else {
          // Sets the passed student's
          // data state.
          serverData.isExists = true;
        }
      }
    }
  }
  // Sends server results.
  res?.send (serverData);
}

/**
 * @description Exports all public
 *  features.
 * @exports *
*/
module.exports = {
  addStudent,
  clearStr,
  isset
};
