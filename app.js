// Dependencies.
const express = require ("express"), parser = require ("body-parser"), port = process.env.PORT || 5000, app = express ();
const sqlite = require ("better-sqlite3"), db = new sqlite ("database.db", new Object ({verbose: console.log}));

// Configurations.
app.use (parser.urlencoded ({extended: true}));
app.use (express.static (__dirname));
app.use (parser.json ());

// Logics.
app.get ('/', (req, res) => res.sendFile ("./index.html", new Object ({root: __dirname})));
app.get ("/sign-up", (req, res) => res.sendFile ("./index.html", new Object ({root: __dirname})));
app.get ("/students", (req, res) => res.sendFile ("./index.html", new Object ({root: __dirname})));
app.get ("/*", (req, res) => res.sendFile ("./html/error_404.html", new Object ({root: __dirname})));
app.post ("/students-data", (req, res) => res.send (db.prepare ("SELECT * FROM Studies;").all ()));
app.post ("/data", (req, res) => {
	// Contains the final result.
	const server_data = new Object ({});
	// For the firstname.
	if (!is_empty (req.body.firstname)) {
		// Checks numbers.
		if (is_empty (req.body.firstname.match (/(\d+)/))) {
			server_data.firstname = "ok";
			server_data.ok = true;
		// Otherwise.
		} else {
			server_data.firstname = "Le(s) prénom(s) donné(s) ne sont pas correct.";
			server_data.ok = false;
		}
	// Otherwise.
	} else {
		server_data.firstname = "Vous n'avez pas donner votre/vos prénom(s).";
		server_data.ok = false;
	}
	// For the lastname.
	if (!is_empty (req.body.lastname)) {
		// Checks numbers.
		if (is_empty (req.body.lastname.match (/(\d+)/))) {
			server_data.lastname = "ok";
			server_data.ok = true;
		// Otherwise.
		} else {
			server_data.lastname = "Le nom donné n'est pas correct.";
			server_data.ok = false;
		}
	// Otherwise.
	} else {
		server_data.lastname = "Vous n'avez pas donner votre nom de famille.";
		server_data.ok = false;
	}
	// For the phone number.
	if (!is_empty (req.body.phone_number)) {
		// Is it a correct phone number ?
		if (String (req.body.phone_number).length !== 8) {
			// Error message.
			server_data.phone_number = "Votre numéro de téléphone est incorrecte.";
			server_data.ok = false;
		// Otherwise.
		} else {
			server_data.phone_number = "ok";
			server_data.ok = true;
		}
	// Otherwise.
	} else {
		server_data.phone_number = "Vous n'avez pas préciser votre numéro de téléphone.";
		server_data.ok = false;
	}
	// Checks whether all passed data are correct.
	if (server_data.ok) {
		// Prepares the study search.
		const study_data = db.prepare ("SELECT firstname, lastname FROM Studies WHERE firstname = ? AND lastname = ?;");
		// The passed user doesn't exists.
		if (is_empty (study_data.get (req.body.firstname, req.body.lastname))) {
			// Prepares the target database SQL request.
			const insertion = db.prepare ("INSERT INTO Studies (firstname, lastname, phone_number) VALUES (?, ?, ?);");
			// Runs the prepared SQL request.
			insertion.run (req.body.firstname, req.body.lastname, req.body.phone_number);
			server_data.already = false;
		// Otherwise.
		} else server_data.already = true;
	}
	// Sends server data to client.
	delete server_data ["ok"];
	res.send (server_data);
});

// Checks whether a variable is not undefined and null.
function is_empty (attr) {
	return attr === undefined || attr === null || String (attr).trim ().length === 0;
}

// Starts the server.
app.listen (port, err => {
	// An error is thrown.
	if (err) console.log ("Server Error: ", err);
	// Otherwise.
	else {
		// Creates the studies table whether this's not defined.
		db.exec ("CREATE TABLE IF NOT EXISTS Studies ('firstname' varchar, 'lastname' varchar, 'phone_number' integer, 'id' integer PRIMARY KEY);");
		// Warns the user on server starting.
		console.log ("Server started at port: ", port);
	}
});
