// Creating study data class.
function StudyDataViewer () {
	// Attributes.
	let delay = 0.0;

	// Adds a study data with the given values.
	this.add_data = (fname, lname, phone) => {
		// Generates the corresponding css format.
		let generated_id = ("div#" + fname.replace (' ', '-') + '-' + lname.replace (' ', '-') + "-data");
		// Generates the corresponding html format.
		$ ("div.study-data").append ("<br/><div class = 'data' id = '" + generated_id.split ('#') [1] + "'>\
			<div class = 'attributes'>\
				<div class = 'fname-row'><label>Prénom(s)</label></div><br/>\
				<div class = 'lname-row'><label>Nom</label></div><br/>\
				<div class = 'pnumber-row'><label>Numéro de téléphone</label></div>\
			</div><div class = 'values'>\
				<div class = 'fname-row'><label>: " + fname + "</label></div><br/>\
				<div class = 'lname-row'><label>: " + lname + "</label></div><br/>\
				<div class = 'pnumber-row'><label>: " + phone + "</label></div>\
			</div>\
		</div>");
		// Waiting for the system delay.
		window.setTimeout (() => $ (generated_id).animate ({opacity: 1}, "fast"), delay);
		delay += 150;
	}
}

// Animates the study data web page.
function animate_study_data (direction = 1, finished =  null) {
	// Enabled back button.
	$ ("svg#back-btn").css ("visibility", "visible").css ("pointer-events", "auto");
	// Checks browser network.
	if (window.navigator.onLine) {
		// Checks animation direction.
		if (direction >= 1) title_bar_visibility (true, () => {
			// Animates the title view.
			animate_text (document.querySelector ("div.title-zone > label"), "Liste des étudiants", 25, 0, 1, false, finished);
		// Otherwise.
		}); else {
			// Removes the current page.
			$ ("div.views").html ('');
			// Animates the title view.
			animate_text (document.querySelector ("div.title-zone > label"), "Liste des étudiants", 15, 0, -1, true, () => {
				// Hides the title bar.
				title_bar_visibility (false, () => {
					// Disables the back button action and visibility.
					$ ("svg#back-btn").css ("visibility", "hidden").css ("pointer-events", "none");
					// Calls the given callback whether it exists.
					if (finished !== undefined && finished !== null) finished ();
				});
			});
		}
	// Network error.
	} else alert ("Votre navigateur n'est pas connecté. Vérifiez votre réseau, puis reéssayez.");
}

// Loads saved study(ies) data from the database.
function load_studies_data () {
	// Creating a new studies viewer.
	let study_viewer = new StudyDataViewer ();
	// Calls ajax requester to get all saved study(ies) from the database.
	ajax_request ("/students-data", "POST", new Object ({}), server_data => {	
		// No data have been found.
		if (server_data.length === 0 || is_empty (server_data)) $ ("div.no-data-zone").css ("display", "flex");
		// Otherwise.
		else {
			// Disables "No data available" message.
			$ ("div.no-data-zone").css ("display", "none");
			// Iterates over study(ies) data.
			for (let study_data of server_data) {
				// Adds each loaded data.
				study_viewer.add_data (study_data.firstname, study_data.lastname, study_data.phone_number);
			}
		}
	// For failed ajax request.
	}, status => console.err ("Failed to make the target ajax request: ", status));
}

// Animates the study(ies) data web page.
animate_study_data (1, () => load_studies_data ());
// Fixing back button action.
$ ("svg#back-btn").click (() => animate_study_data (-1, () => $ ("div.views").load ("../html/study_sign_up.html")));
