/**
* @project Simple Student Saver - https://simple-student-saver.onrender.com
* @fileoverview The controller to manage a student sign up process.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2024-04-29
* @file sign_up.js
* @version 1.0.2
*/

// Global attributes.
window.firstName = (
	document.querySelector (
		"input#firstname"
	)
);
window.phoneNumber = (
	document.querySelector (
		"input#phone"
	)
);
window.lastName = (
	document.querySelector (
		"input#lastname"
	)
);
window.options = (
	document.querySelector (
		"div.options"
	)
);

/**
 * @description Puts a mouse
 * 	blur effect to an input.
 * @param {Element} element
 * 	The input field ref.
 * @param {String=} color
 * 	The blur color.
 * @private {Function}
 * @function blurer_
 * @returns {void} void
 */
function blurer_ (
	element,
	color = "silver"
) {
	// Apply input blur
	// focus effect.
	$ (element).css (
		"box-shadow",
		`0 0 2px 2px ${color}`
	).css (
		"font-weight",
		"normal"
	).css (
		"border",
		"1px solid transparent"
	);
}

/**
 * @description Puts a mouse
 * 	focus effect to an input.
 * @param {Element} element
 * 	The input field ref.
 * @param {String=} color
 * 	The focus color.
 * @private {Function}
 * @function focuser_
 * @returns {void} void
 */
function focuser_ (
	element,
	color = "steelblue"
) {
	// Apply input focus
	// effect.
	$ (element).css (
			"transition",
			"box-shadow 400ms"
		).css (
			"font-weight",
			"bold"
		).css (
			"box-shadow",
			`0 0 2px 2px ${color}`
		).css (
			"border",
			"1px solid transparent"
		);
}

/**
 * @description Shows an error
 * 	message for the given input.
 * @param {Element} element
 * 	The input field ref.
 * @param {String} message
 * 	The error message.
 * @param {String=} color
 * 	The error color.
 * @function showError_
 * @private {Function}
 * @returns {void} void
 */
function showError_ (
	element,
	message,
	color = "red"
) {
	// Prints the given
	// message as an
	// error message
	// on the app
	// view.
	$ (element).children ()[1]
		.innerText = message;
	// Puts the focus to
	// input that present
	// the error.
	focuser_ (
		$ (element).children ()[0],
		color
	);
}

/**
 * @description Adds a student
 * 	to database.
 * @function addStudent_
 * @private {Function}
 * @returns {void} void
 */
function addStudent_ () {
	// Whether the browser
	// is connected to
	// internet.
	if (window.navigator.onLine) {
		// Corrects the passed
		// firstname.
		$ (firstName).val (
			capitalize (
				$ (firstName).val ()
			)?.trim ().replace (
				/(<([^>]+)>)/ig, ''
			)
		);
		// Corrects the passed
		// lastname.
		$ (lastName).val (
			$ (lastName).val ()
				.toUpperCase ()
				.trim ().replace (
					/(<([^>]+)>)/ig, ''
				)
		);
		// Corrects the passed
		// phone number.
		$ (phoneNumber).val (
			parseInt (
				Math.abs (
					$ (phoneNumber).val ()
				)
			)
		);
		// Calls ajax requester
		// to send student data
		// to the server.
		ajaxRequest ({
			method: "POST",
			link: "/data",
			payload: {
				phoneNumber: (
					$ (phoneNumber).val ()
				),
				firstName: (
					$ (firstName).val ()
				),
				lastName: (
					$ (lastName).val ()
				)
			},
			// Failed ajax request.
			onFailed: _ => (
				Toastify ({
					...toastConfigs,
					text: clearStr (`
						Unable to save the student. 
						It seem that something 
						wrong, please retry.
					`)
				}).showToast ()
			),
			// Success ajax request.
			onSuccess: ({
				phoneNumber,
				isAccepted,
				firstName,
				lastName,
				isExists
			}) => {
				// Whether an error is
				// detected.
				if (!isAccepted) {
					// Whether an error is
					// detected about the
					// passed phone number.
					if (phoneNumber !== "OK") {
						// Displays server
						// error message.
						showError_ (
							"div.phone-number-zone",
							phoneNumber
						);
					}
					// Whether an error is
					// detected about the
					// passed firstname.
					if (firstName !== "OK") {
						// Displays server
						// error message.
						showError_ (
							"div.firstname-zone",
							firstName
						);
					}
					// Whether an error is
					// detected about the
					// passed lastname.
					if (lastName !== "OK") {
						// Displays server
						// error message.
						showError_ (
							"div.lastname-zone",
							lastName
						);
					}
				// Otherwise.
				} else {
					// Whether the given
					// student is already
					// defined inside the
					// database.
					if (isExists) {
						// Makes a warn about
						// an existing student.
						Toastify ({
							...toastConfigs,
							text: clearStr (`
								The specified student 
								has already been 
								registered.
							`)
						}).showToast ();
					// Otherwise.
					} else {
						// Makes a warn about
						// the successfull
						// operation.
						Toastify ({
							...toastConfigs,
							text: clearStr (`
								The referred student 
								has been registered 
								successfully.
							`)
						}).showToast ();
					}
				}
			}
		});
	// Network error.
	} else {
		// Makes a warn about
		// a network error.
		Toastify ({
			...toastConfigs,
			text: clearStr (`
				The browser isn't connected 
				to internet. Check your 
				network and retry.
			`)
		}).showToast ();
	}
}

/**
 * @description Animates the current
 * 	web page.
 * @param {int=} direction The
 *  animation direction.
 * @param {Function=} finish
 * 	Called at the end of the
 * 	animation.
 * @private {Function}
 * @function animate_
 * @returns {void} void
 */
function animate_ (
	direction = 1,
	finish = null
) {
	// The form title text.
	const formText = "Sign up student";
	// The title bar text.
	const headerText = "Sign Up";
	// Disables options.
	$ ("input, svg#back-btn").css (
		"pointer-events", "none"
	);
	// Hides the back button.
	$ ("svg#back-btn").css (
		"visibility", "hidden"
	);
	// The initial values.
	const initialValues = {
		opacity: 0,
		width: 0
	};
	// The final values.
	const finalValues = {
		width: "250px",
		opacity: 1
	};
	// The header bar title.
	const headerTitle = (
		document.querySelector (
			"div.title-zone > span"
		)
	);
	// The sign up form title.
	const formTitle = (
		document.querySelector (
			"div.title > span"
		)
	);
	// Sets animation data.
	const animData = (
		name, dir = "normal"
	) => ({
		direction: dir,
		duration: 150,
		name
	});
	// Sets transform data.
	const setTransformY = (
		value, opacity
	) => ({
		opacity,
		transform: (
			`translateY(${value})`
		)
	});
	// Whether the animation
	// direction is normal.
	if (direction >= 1) {
		// Shows the title bar.
		setTitleBarVisibility (
			true, () => (
				animateText ({
					target: headerTitle,
					text: headerText,
					interval: 25,
					onFinished: () => (
						animateText ({
							target: formTitle,
							text: formText,
							interval: 25,
							onFinished: () => (
								cssAnimation ({
									...animData ("scale"),
									ref: firstName,
									finish: () => (
										cssAnimation ({
											...animData ("scale"),
											ref: lastName,
											finish: () => (
												cssAnimation ({
													...animData ("scale"),
													ref: phoneNumber,
													finish: () => (
														cssAnimation ({
															...animData ("optionsShow"),
															ref: options,
															finish
														}, setTransformY ('0', 1))		
													)
												}, finalValues)
											)
										}, finalValues)
									)
								}, finalValues)
							)
						})
					)
				})
			)
		);
	// Otherwise.
	} else {
		// Options animation.
		cssAnimation ({
			...animData ("optionsShow", "reverse"),
			ref: options,
			finish: () => (
				cssAnimation ({
					...animData ("scale", "reverse"),
					ref: phoneNumber,
					finish: () => (
						cssAnimation ({
							...animData ("scale", "reverse"),
							ref: lastName,
							finish: () => (
								cssAnimation ({
									...animData ("scale", "reverse"),
									ref: firstName,
									finish: () => (
										animateText ({
											target: formTitle,
											text: formText,
											reverse: true,
											interval: 15,
											onFinished: () => (
												animateText ({
													target: headerTitle,
													text: headerText,
													reverse: true,
													interval: 15,
													onFinished: () => (
														setTitleBarVisibility (
															false, finish
														)
													)
												})
											)
										})
									)
								}, initialValues)
							)
						}, initialValues)
					)
				}, initialValues)
			)
		}, setTransformY ("-52px", 0));
	}
}

// Listens `click` event
// on the save button.
$ (options).children ()[1]
	.addEventListener (
		"click", addStudent_
	);

// When the phone number
// field get focus.
$ (phoneNumber).focus (() => {
	// Puts the focus on that.
	focuser_ (phoneNumber);
	// Clears his error message.
	$ (phoneNumber).parent ()
		.children ()[1].innerText = '';
}).blur (
	() => blurer_ (phoneNumber)
);

// When the first name
// field get focus.
$ (firstName).focus (() => {
	// Puts the focus on that.
	focuser_ (firstName);
	// Clears his error message.
	$ (firstName).parent ()
		.children ()[1].innerText = '';
}).blur (
	() => blurer_ (firstName)
);

// When the last name
// field get focus.
$ (lastName).focus (() => {
	// Puts the focus on that.
	focuser_ (lastName);
	// Clears his error message.
	$ (lastName).parent ()
		.children ()[1].innerText = '';
}).blur (
	() => blurer_ (lastName)
);

// Animates the loaded page.
animate_ (1, () => {
	// Enables fields.
	$ ("input").css (
		"pointer-events", "auto"
	);
	// Listens `keydown` event
	// on the phone number field.
	phoneNumber.addEventListener (
		"keydown", event => {
			// Whether the pressed
			// key is `Enter`.
			if (event.key == "Enter") {
				// Adds the current
				// student to the
				// database.
				addStudent_ ();
			}
		}
	);
	// Listens `keydown` event
	// on the first name field.
	firstName.addEventListener (
		"keydown", event => {
			// Whether the pressed
			// key is `Enter`.
			if (event.key == "Enter") {
				// Adds the current
				// student to the
				// database.
				addStudent_ ();
			}
		}
	);
	// Listens `keydown` event
	// on the last name field.
	lastName.addEventListener (
		"keydown", event => {
			// Whether the pressed
			// key is `Enter`.
			if (event.key == "Enter") {
				// Adds the current
				// student to the
				// database.
				addStudent_ ();
			}
		}
	);
});

// Listens `click` event
// on the load button.
$ (options).children ()[0]
	.addEventListener (
		"click", () => {
			// Whether the browser
			// is connected to
			// internet.
			if (window.navigator.onLine) {
				// Disables any interactions
				// on the formulary.
				$ ("input").css (
					"pointer-events", "none"
				);
				// Destroys the error
				// message of the phone
				// number field.
				showError_ (
					"div.phone-number-zone",
					'', "silver"
				);
				// Destroys the error
				// message of the first
				// name field.
				showError_ (
					"div.firstname-zone",
					'', "silver"
				);
				// Destroys the error
				// message of the last
				// name field.
				showError_ (
					"div.lastname-zone",
					'', "silver"
				);
				// Loads students
				// data web page.
				animate_ (
					-1, () => (
						$ ("main.content")
							.html ('').load (
								clearStr (`
									./src/features/fetch_students/data.html
								`, true)
							)
					)
				);
			// Network error.
			} else {
				// Makes a warn about
				// a network error.
				Toastify ({
					...toastConfigs,
					text: clearStr (`
						The browser isn't connected 
						to internet. Check your 
						network and retry.
					`)
				}).showToast ();
			}
		}
	);
