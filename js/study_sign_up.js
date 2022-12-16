// Global attributes.
window.firstname = document.querySelector ("input#firstname");
window.phone_number = document.querySelector ("input#phone");
window.lastname = document.querySelector ("input#lastname");
window.options = document.querySelector ("div.options");

// Puts a mouse focus effect to an input.
function focuser (element, color = "steelblue") {
	// Apply input focus effect.
	$ (element).css ("transition", "box-shadow 400ms").css ("font-weight", "bold").css ("box-shadow", ("0 0 2px 2px " + color));
}

// Shows an error message for given input.
function show_error (element, message, color = "red") {
	// Prints the given message as an error message on the app view.
	$ (element).children () [1].innerText = message; focuser ($ (element).children () [0], color);
}

// Puts a mouse blur effect to an input.
function blurer (element, color = "silver") {
	// Apply input blur focus effect.
	$ (element).css ("box-shadow", ("0 0 2px 2px " + color)).css ("font-weight", "normal");
}

// Adds a study to server database.
function add_study () {
	// Checks browser network.
	if (window.navigator.onLine) {
		// Correcting the passed firstname.
		$ (firstname).val (str_capitalize (String ($ (firstname).val ()).trim ().replace (/(<([^>]+)>)/ig, '')));
		// Correcting the passed lastname.
		$ (lastname).val (String ($ (lastname).val ()).toUpperCase ().trim ().replace (/(<([^>]+)>)/ig, ''));
		// Correcting the passed phone number.
		$ (phone_number).val (parseInt (Math.abs ($ (phone_number).val ())));
		// Calls ajax requester to send study data to the server.
		ajax_request ("/data", "POST", new Object ({
			firstname: $ (firstname).val (), lastname: $ (lastname).val (), phone_number: $ (phone_number).val ()
		}), data => {
			// Is it Okey ?
			if (data.firstname !== "ok" || data.lastname !== "ok" || data.phone_number !== "ok") {
				// Checks firstname server message.
				if (data.firstname !== "ok") show_error ("div.firstname-zone", data.firstname);
				// Checks lastname server message.
				if (data.lastname !== "ok") show_error ("div.lastname-zone", data.lastname);
				// Checks phone number server message.
				if (data.phone_number !== "ok") show_error ("div.phone-number-zone", data.phone_number);
			// Otherwise.
			} else {
				// The donated study is it exists ?
				if (data.already) alert ("L'étudiant référé est déjà inscrit dans la base de données.");
				// Otherwise.
				else alert ("Enregistrement éffectué !");
			}
		// For failed ajax request.
		}, status => console.err ("Failed to make the target ajax request: ", status));
	// Network error.
	} else alert ("Votre navigateur n'est pas connecté. Vérifiez votre réseau, puis reéssayez.");
}

// Animates the current page.
function study_sign_up_animation (direction = 1, finished = null) {
	// Disabled a certains features.
	$ ("svg#back-btn").css ("visibility", "hidden"); $ ("input, svg#back-btn").css ("pointer-events", "none");
	// Checks animation direction.
	if (direction >= 1) title_bar_visibility (true, () => {
    	// Animates the title view.
		animate_text (document.querySelector ("div.title-zone > label"), "Inscription", 25, 0, 1, false, () => {
			// Title animation.
			animate_text (document.querySelector ("div.title label"), "Inscrire un étudiant", 25, 0, -1, false, () => {
				// First name field animation.
				apply_css_animation (new Object ({name: "scale", duration: 150, ref: firstname, finish: () => {
					// Last name field animation.
					apply_css_animation (new Object ({name: "scale", duration: 150, ref: lastname, finish: () => {
						// Phone number field animation.
						apply_css_animation (new Object ({name: "scale", duration: 150, ref: phone_number, finish: () => {
							// Options animation.
							apply_css_animation (new Object ({name: "options_show", duration: 150, ref: options,
							finish: finished}), new Object ({opacity: 1, transform: "translateY(0)"}));					
						}}), new Object ({opacity: 1, width: "250px"}));
					}}), new Object ({opacity: 1, width: "250px"}));
				}}), new Object ({opacity: 1, width: "250px"}));
			});
		});
	}); else apply_css_animation ({name: "options_show", duration: 150, direction: "reverse", ref: options, finish: () => {
		// Phone number field animation.
		apply_css_animation ({name: "scale", duration: 150, direction: "reverse", ref: phone_number, finish: () => {
			// Last name field animation.
			apply_css_animation ({name: "scale", duration: 150, direction: "reverse", ref: lastname, finish: () => {
				// First name field animation.
				apply_css_animation ({name: "scale", duration: 150, direction: "reverse", ref: firstname, finish: () => {
					// Animates the title view.
					animate_text (document.querySelector ("div.title label"), "Inscrire un étudiant", 15, 0, 1, true, () => {
						// Animates the title view.
						animate_text (document.querySelector ("div.title-zone > label"), "Inscription", 15, 0, -1, true, () => {
							// Hides the title bar.
							title_bar_visibility (false, finished);
						});
					});
				}}, new Object ({opacity: 0, width: 0}));
			}}, new Object ({opacity: 0, width: 0}));
		}}, new Object ({opacity: 0, width: 0}));
	}}, new Object ({opacity: 0, transform: "translateY(-52px)"}));
}

// Animates the loaded page.
study_sign_up_animation (1, () => {$ ("input").css ("pointer-events", "auto");
	// Fixing "keydown" event on firstname field.
	firstname.addEventListener ("keydown", event => {
		if (event.key == "Enter") add_study ();
	});
	// Fixing "keydown" event on lastname field.
	lastname.addEventListener ("keydown", event => {
		if (event.key == "Enter") add_study ();
	});
	// Fixing "keydown" event on phone number field.
	phone_number.addEventListener ("keydown", event => {
		if (event.key == "Enter") add_study ();
	});
});
// First name foucus and blur event fixing.
$ (firstname).focus (() => {
	$ (firstname).parent ().children () [1].innerText = '';
	focuser (firstname);
}).blur (() => blurer (firstname));
// Last name foucus and blur event fixing.
$ (lastname).focus (() => {
	$ (lastname).parent ().children () [1].innerText = '';
	focuser (lastname);
}).blur (() => blurer (lastname));
// Phone number foucus and blur event fixing.
$ (phone_number).focus (() => {
	$ (phone_number).parent ().children () [1].innerText = '';
	focuser (phone_number);
}).blur (() => blurer (phone_number));
// Fixing save button action.
$ (options).children () [1].addEventListener ("click", () => add_study ());
// Fixing study list button action.
$ (options).children () [0].addEventListener ("click", () => {
	// Checks browser network.
	if (window.navigator.onLine) {
		// Destroys all availables error message on the app view and disables all inputs events action.
		show_error ("div.phone-number-zone", '', "silver");
		show_error ("div.firstname-zone", '', "silver");
		show_error ("div.lastname-zone", '', "silver");
		$ ("input").css ("pointer-events", "none");
		// Loads the study data web page.
		study_sign_up_animation (-1, () => $ ("div.views").html ('').load ("../html/study_data.html"));
	// Network error.
	} else alert ("Votre navigateur n'est pas connecté. Vérifiez votre réseau, puis reéssayez.");
});
