/**
* @project Simple Student Saver - https://simple-student-saver.onrender.com/
* @fileoverview The logic to fetch all logged student(s) from the database.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-11-12
* @version 1.0.1
* @file data.js
*/

/**
 * @description Animates the
 * 	student data web page.
 * @param {int=} direction
 * 	The animation direction.
 * @param {Function=} finished
 * 	Called when animattion is
 * 	over.
 * @fires animateData_#finished
 * @private {Function}
 * @function animate_
 * @returns {void} void
 */
function animateData_ (
	direction = 1,
	finished = null
) {
	// Enables back button.
	$ ("svg#back-btn").css (
		"pointer-events", "auto"
	).css (
		"visibility", "visible"
	);
	// Whether the browser
	// is online.
	if (window.navigator.onLine) {
		// The text to write/backspace.
		const text = "Students List";
		// The title bar text.
		const title = (
			document.querySelector (
				"div.title-zone > span"
			)
		);
		// Whether the animation
		// direction is normal.
		if (direction >= 1) {
			// Shows the title bar.
			setTitleBarVisibility (
				true, () => (
					animateText ({
						onFinished: finished,
						target: title,
						interval: 25,
						text
					})
				)
			);
		// Otherwise.
		} else {
			// Removes the current page.
			$ ("main.content").html ('');
			// Animates the title view.
			animateText ({
				reverse: true,
				target: title,
				interval: 25,
				text,
				onFinished: () => (
					setTitleBarVisibility (
						false, () => {
							// Disables the back
							// button action and
							// visibility.
							$ ("svg#back-btn").css (
								"pointer-events",
								"none"
							).css (
								"visibility",
								"hidden"
							);
							// Whether `finished`
							// event is listening.
							if (
								typeof finished ===
									"function"
							) finished ();
						}
					)
				)
			});
		}
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
 * @description Loads student(s)
 * 	data from the database.
 * @function loadStudentsData_
 * @private {Function}
 * @returns {void} void
 */
function loadStudentsData_ () {
	// Creates a new student
	// data viewer.
	let viewer = new StudentViewer ();
	// Calls ajax requester
	// to get all saved
	// student(s) from
	// the database.
	ajaxRequest ({
		link: "/students-data",
		method: "POST",
		payload: {},
		// Failed ajax request.
		onFailed: _ => {
			// Makes a warn about
			// an error.
			Toastify ({
				...toastConfigs,
				text: clearStr (`
					Unable to load student(s) 
					data. It seem that 
					something wrong, 
					please retry.
				`)
			}).showToast ();
		},
		onSuccess: serverData => {
			// No data have been
			// found.
			if (
				serverData.length === 0
				|| isset (serverData)
			) {
				// Displays a tag
				// about no data.
				$ ("div.no-data-zone").css (
					"display", "flex"
				);
			// Otherwise.
			} else {
				// Hides the message.
				$ ("div.no-data-zone").css (
					"display", "none"
				);
				// Displaying student(s)
				// data.
				for (
					let student of serverData
				) {
					// Adds each loaded data.
					viewer.addData (
						student.firstName,
						student.lastName,
						student.phoneNumber
					);
				}
			}
		}
	});
}

// Animates the student(s) data
// web page.
animateData_ (1, loadStudentsData_);

// Listens `click` event on the
// back button.
$ ("svg#back-btn").click (
	() => animateData_ (
		-1, () => (
			$ ("main.content").load (
				clearStr (`
					./front_end/src/features
					/add_student/sign_up.html
				`, true)
			)
		)
	)
);
