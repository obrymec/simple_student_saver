/**
* @project Simple Student Saver - https://www.google.com
* @fileoverview Defines some methods to manage
* 	frequent tasks.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-07-26
* @version 1.0.0
* @file std.js
*/

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
 * @description Makes some ajax request
 * 	with a link and his data.
 * @param {{
 *	payload?: Object<String, any>,
 *	method: !String,
 *	link: !String
 *	onFailed?: ?Function(
 *		status: int
 *	),
 *	onSuccess?: ?Function(
 * 		response: String,
 * 		status: int
 * 	),
 * }} data The request data. It
 * 	supports the following keys:
 * 	- String method: The request's method.
 * 	- String link: The request's link.
 * 	- Object<String, any> payload: The
 * 		request's data.
 * 	- ?Function= onSucess: Called when
 * 		the request successed.
 * 	- ?Function= onFailed: Called when
 * 		the request failed.
 * @fires ajaxRequest#onSuccess
 * @fires ajaxRequest#onFailed
 * @function ajaxRequest
 * @public
 * @returns {void} void
 */
function ajaxRequest ({
	onSuccess = null,
	onFailed = null,
	payload,
	method,
	link
}) {
	// Creating a new xml http request.
	const xhr = new XMLHttpRequest ();
	// Opens the xhr with the passed
	// parameters.
	xhr.open (method, link, true);
	// Changes the default header.
	xhr.setRequestHeader (
		"Content-type",
		"application/json;charset=UTF-8"
	);
	// Sends the passed data.
	xhr.send (JSON.stringify (payload));
	// Listens server response.
	xhr.onload = () => {
		// Whether no fatal errors
		// is detected.
		if (
			xhr.status >= 200 &&
			xhr.status < 400
		) {
			// Whether `success` event
			// is listening.
			if (!isset (onSuccess)) {
				/**
				* @description Throws `success`
				*		event.
				* @event ajaxRequest#onSuccess
				* @property {String} response
				*		The request response as
				*		text format.
				*	@property {int} status The
				*		request status.
				* @readonly
				*/
				onSuccess (
					JSON.parse (xhr.responseText),
					xhr.status
				);
			}
		// Otherwise.
		} else if (!isset (onFailed)) {
			/**
			* @description Throws `failed`
			*		event.
			* @event ajaxRequest#onFailed
			* @property {int} status The
			*		request status.
			* @readonly
			*/
			onFailed (xhr.status);
		}
	}
}
