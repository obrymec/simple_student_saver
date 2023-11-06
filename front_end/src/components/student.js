/**
* @project Simple Student Saver - https://obrymec.github.io/simple_student_saver
* @fileoverview The graphical data viewer of a student.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @type {StudentViewer}
* @created 2023-11-05
* @updated 2023-11-05
* @file student.js
* @version 0.0.1
*/

/**
 * @classdesc A graphical component
 * 	to visualize a student data.
 * @type {StudentViewer}
 * @public
 * @class
 */
function StudentViewer () {
	// Attributes.
	let delay_ = 0.0;

	/**
	 * @description Adds a student
	 * 	data with the given values
	 * @param {String} fname The
	 * 	student's first name.
	 * @param {String} lname The
	 * 	student's last name.
	 * @param {String} phone The
	 * 	student's phone number.
	 * @function addData
	 * @public
	 * @returns {void} void
	 */
	this.addData = (
		fname,
		lname,
		phone
	) => {
		// Generates the associated
		// css format.
		let generatedId = (
			`div#${
				fname.replace (
					/\s/g, '-'
				)}-${
					lname.replace (
						/\s/g, '-'
					)}-data`
			);
		// Generates the associated
		// html format.
		$ ("div.student-data").append (`
			<br/>
			<div
				class = "data"
				id = "${
					generatedId.split (
						'#'
					)[1]
				}"
			>
				<div
					class = "attributes"
				>
					<div class = "fname-row">
						<span>FirstName</span>
					</div>
					<br/>
					<div class = "lname-row">
						<span>LastName</span>
					</div>
					<br/>
					<div class = "pnumber-row">
						<span>Phone Number</span>
					</div>
				</div>
				<div class = "values">
					<div class = "fname-row">
						<span>: ${fname}</span>
					</div>
					<br/>
					<div class = "lname-row">
						<span>: ${lname}</span>
					</div>
					<br/>
					<div class = "pnumber-row">
						<span>: ${phone}</span>
					</div>
				</div>
			</div>
		`);
		// Waiting for the
		// system delay.
		window.setTimeout (
			() => (
				$ (generatedId).animate (
					{opacity: 1}, "fast"
				)
			),
			delay_
		);
		// Increases the
		// current delay.
		delay_ += 150;
	}
}
