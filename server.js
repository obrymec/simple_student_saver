/**
* @fileoverview Defines routes, paths and nodejs server configs with expressjs.
* @project Simple Student Saver - https://simple-student-saver.onrender.com/
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-11-12
* @file server.js
* @version 1.0.1
*/

// Plugin dependencies.
const sqlite = require ("better-sqlite3");
const parser = require ("body-parser");
const express = require ("express");

// Custom dependencies.
const api = require ("./back_end/api.js");

// Attributes.
const app = express ();
const port = (
	process.env.PORT || 5000
);
const db = new sqlite (
	"./back_end/database.db", {
		verbose: console.log
	}
);

// Configurations.
app.use (parser.json ());
app.use (
	express.static (
		__dirname
	)
);
app.use (
	parser.urlencoded ({
		extended: true
	})
);

// Home page.
app.get (
	'/',
	(_, res) => res.sendFile (
		`${
			__dirname
		}/front_end/public/index.html`,
	)
);

// Sends the sign up page.
app.get (
	"/sign-up",
	(_, res) => res.sendFile (
		`${
			__dirname
		}/front_end/public/index.html`,
	)
);

// Sends student(s) page.
app.get (
	"/students",
	(_, res) => res.sendFile (
		`${
			__dirname
		}/front_end/public/index.html`,
	)
);

// Sends student(s) data.
app.post (
	"/students-data",
	(_, res) => res.send (
		db.prepare (
			"SELECT * FROM Students;"
		).all ()
	)
);

// Adds student to database.
app.post (
	"/data",
	(req, res) => (
		api.addStudent (
			req.body, db, res
		)
	)
);

// Unknown link.
app.get (
	"/*",
	(_, res) => res.sendFile (
		api.clearStr (`
			${__dirname}/front_end
			/src/features
			/page_not_found
			/error_404.html
		`, true)
	)
);

// Starts the server.
app.listen (port, err => {
	// Whether an error is
	// thrown.
	if (err) {
		// Displays this error
		// message.
		console.error (
			"Server Error: ", err
		);
	// Otherwise.
	} else {
		// Creates the students
		// table whether this's
		// not defined.
		db.exec (
			api.clearStr (`
				CREATE TABLE IF NOT 
				EXISTS Students (
					'firstName' varchar, 
					'lastName' varchar, 
					'phoneNumber' integer, 
					'id' integer PRIMARY KEY
				);
			`)
		);
		// Warns the user when
		// the server start.
		console.log (
			"Server started at port: ",
			port
		);
	}
});
