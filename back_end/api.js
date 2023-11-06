/**
* @project Simple Student Saver - https://obrymec.github.io/simple_student_saver
* @fileoverview Provides an API to manage students data inside a database.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-11-05
* @version 1.0.0
* @file api.js
*/

/**
 * @description Removes noise chars
 *  from a literal string.
 * @param {String} input The string
 *  to clear.
 * @param {boolean=} clearSpaces
 *  Whether we wish to remove all
 *  available spaces on the string.
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
  ).trim ().replaceAll (
    (clearSpaces ? ' ' : ''),
    ''
  );
}

/**
 * @description Checks whether an
 *  input is an invalid js value.
 * @param {any} attr An input
 *  value.
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
 * @param {String} firstName The
 *  student firstname.
 * @function checkFirstName_
 * @private {Function}
 * @returns {{
 *  isAccepted: boolean,
 *  firstName: String
 * }} Object
 */
function checkFirstName_ (
  firstName
) {
  // Removes left and right spaces.
  firstName = firstName.trim ();
  // Whether the firstname is
  // defined.
	if (!isset (firstName)) {
    // Whether the firstname
    // is incorrect.
    const isIncorrect = (
      /[\-_\$@!\+\*&\^%#`~\(\)\[\]\.\?/\\'";:\=\|\<\>\,\{\}]/g
      .test (
        firstName.replace (
          / /g, ''
        )
      )
    );
		// Whether the firstname
    // is incorrect.
		if (
      /^\d/.test (firstName)
      || isIncorrect
    ) {
      // Sends bad results.
      return {
        isAccepted: false,
        firstName: clearStr (`
          The given first name 
          is incorrect.
        `)
      };
		// Otherwise.
		} else {
      // Sends good results.
      return {
        isAccepted: true,
        firstName: "OK"
      };
		}
	// Otherwise.
	} else {
    // Sends bad results.
    return {
      isAccepted: false,
      firstName: clearStr (`
        No firstname is given.
      `)
    };
	}
}

/**
 * @description Checks the given
 *  student lastname.
 * @param {String} lastName The
 *  student lastname.
 * @function checkLastName_
 * @private {Function}
 * @returns {{
 *  isAccepted: boolean,
 *  lastName: String
 * }} Object
 */
function checkLastName_ (
  lastName
) {
  // Removes left and right spaces.
  lastName = lastName.trim ();
  // Whether the lastname is
  // defined.
  if (!isset (lastName)) {
    // Whether the lastname
    // is incorrect.
    const isIncorrect = (
      /[\-_\$@!\+\*&\^%#`~\(\)\[\]\.\?/\\'";:\=\|\<\>\,\{\}]/g
      .test (
        lastName.replace (
          / /g, ''
        )
      )
    );
    // Whether the lastname
    // is correct.
    if (
      /^\d/.test (lastName)
      || isIncorrect
    ) {
      // Sends bad results.
      return {
        isAccepted: false,
        lastName: clearStr (`
          The given lastname 
          is incorrect.
        `)
      };
    // Otherwise.
    } else {
      // Sends good results.
      return {
        isAccepted: true,
        lastName: "OK"
      };
    }
  // Otherwise.
  } else {
    // Sends bad results.
    return {
      isAccepted: false,
      lastName: clearStr (`
        No provided lastname.
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
 * @private {Function}
 * @returns {{
 *  phoneNumber: String,
 *  isAccepted: boolean
 * }} Object
 */
function checkPhoneNumber_ (
  phoneNumber
) {
  // Removes left and right spaces.
  phoneNumber = phoneNumber.trim ();
  // Whether the phone number is
  // defined.
  if (!isset (phoneNumber)) {
    // Whether the phone number
    // is correct with no
    // internationlization.
    const isCorrect = (
      /^\d{8}$/.test (
        phoneNumber.replace (
          / /g, ''
        )
      )
    );
    // Whether the phone number
    // is correct with an
    // internationlization.
    const isValid = (
      /^\d{11}$/.test (
        phoneNumber.replace (
          /[\s\+]/g, ''
        )
      )
    );    
    // Whether the phone number
    // is correct.
    if (isCorrect || isValid) {
        // Sends good results.
        return {
          phoneNumber: "OK",
          isAccepted: true
        };
    // Otherwise.
    } else {
      // Sends bad results.
      return {
        isAccepted: false,
        phoneNumber: clearStr (`
          Invalid phone number.
        `)
      };
    }
  // Otherwise.
  } else {
    // Sends bad results.
    return {
      isAccepted: false,
      phoneNumber: clearStr (`
        No provided phone 
        number.
      `)
    };
  }
}

/**
 * @description Adds the given
 *  student to the database.
 * @param {
 *  Object<String, String>
 * } body The firstname, phone
 *  and lastname number of the
 *  student.
 * @param {
 *  BetterSqlite3.Database
 * } db The database reference.
 * @param {Response} res The
 *  server's response.
 * @function addStudent
 * @public
 * @returns {void} void
 */
function addStudent (
  {
    phoneNumber,
    firstName,
    lastName,
  }, db, res
) {
  // Checks the firstname.
	const firstNameData = (
    checkFirstName_ (firstName)
  );
  // Checks the lastname.
  const lastNameData = (
    checkLastName_ (lastName)
  );
  // Checks the phone number.
  const phoneData = (
    checkPhoneNumber_ (
      phoneNumber
    )
  );
  // The server data.
  const serverData = {
    firstName: (
      firstNameData.firstName
    ),
    phoneNumber: (
      phoneData.phoneNumber
    ),
    lastName: (
      lastNameData.lastName
    ),
    isAccepted: (
      firstNameData.isAccepted &&
      lastNameData.isAccepted &&
      phoneData.isAccepted
    )
  };
  // Whether there are no
  // errors about entries.
  if (serverData.isAccepted) {
    // Prepares the student
    // search query.
    const studentData = (
      db.prepare (
        clearStr (`
          SELECT firstName, 
          lastName FROM 
          Students WHERE 
          firstName = ? 
          AND lastName = ?;
        `)
      )
    ).get (
      firstName, lastName
    );
    // Whether the given student
    // isn't defined inside the
    // database.
    if (
      studentData === undefined
      || studentData === null
    ) {
      // Prepares insertion query.
      const insert = (
        db.prepare (
          clearStr (
            `INSERT INTO Students (
              firstName, 
              lastName, 
              phoneNumber
            ) VALUES (?, ?, ?);
          `)
        )
      );
      // Runs the prepared
      // SQL request.
      insert.run (
        firstName,
        lastName,
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
  // Sends server results.
  res.send (serverData);
}

/**
 * @description Exports
 *  all public features.
 * @exports *
 */
module.exports = {
  addStudent,
  clearStr,
  isset
};
