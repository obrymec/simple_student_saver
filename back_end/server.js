/**
* @project Simple Student Saver - https://obrymec.github.io/simple_student_saver
* @fileoverview Defines routes, paths and nodejs server configs with expressjs.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-10-29
* @file server.js
* @version 1.0.1
*/

// Plugin dependencies.
const sqlite = require ("better-sqlite3");
const parser = require ("body-parser");
const express = require ("express");

// Custom dependencies.
const signUp = require ("./sign_up.js");
	
// Attributes.
const port = (process.env.PORT || 5000);
const options = {root: __dirname};
const app = express ();
const db = new sqlite (
	"./database.db", {
		verbose: console.log
	}
);

// Configurations.
app.use (express.static (options.root));
app.use (parser.json ());
app.use (
	parser.urlencoded ({
		extended: true
	})
);

// Home page.
app.get (
	'/',
	(_, res) => res.sendFile (
		"./front_end/public/index.html",
		options
	)
);

// Sends the sign up page.
app.get (
	"/sign-up",
	(_, res) => res.sendFile (
		"./front_end/public/index.html",
		options
	)
);

// Sends student(s) page.
app.get (
	"/students",
	(_, res) => res.sendFile (
		"./front_end/public/index.html",
		options
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
		signUp.addStudent (
			req.body, db, res
		)
	)
);

// A unknown link.
app.get (
	"/*",
	(_, res) => res.sendFile (
		signUp.clearStr (`
			./font_end/src/features
			/page_not_found/error_404.html
		`, true),
		options
	)
);

// Starts the server.
app.listen (port, err => {
	// Whether an error is thrown.
	if (err) {
		// Displays this error
		// message.
		console.error (
			"Server Error: ", err
		);
	// Otherwise.
	} else {
		// Creates the students table
		// whether this's not defined.
		db.exec (
			signUp.clearStr (`
				CREATE TABLE IF NOT 
				EXISTS Students (
					'firstname' varchar, 
					'lastname' varchar, 
					'phoneNumber' integer, 
					'id' integer PRIMARY KEY
				);
			`)
		);
		// Warns the user on server
		// starting.
		console.log (
			"Server started at port: ",
			port
		);
	}
});
