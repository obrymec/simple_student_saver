/**
* @project Simple Student Saver - https://www.google.com
* @fileoverview Defines some to manage frequent
*   animations.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-07-26
* @version 1.0.0
* @file anim.js
*/

/**
 * @description Animates label characters.
 * @param {{
 * 	onFinished?: ?Function=,
 * 	invert?: boolean=,
 * 	direction?: int=,
 * 	interval? Number,
 * 	parent: !Element,
 * 	delay?: Number=,
 * 	text: !String
 * }} data The animation data. It supports
 * 	the following keys:
 * 	- !Element parent: The parent tag of
 *    animation.
 *  - !String text: The text to animate.
 *  - Number interval: The time each
 *    character animation.
 *  - Number= delay: The time before
 *    start animation.
 *  - boolean= invert: Whether animation
 *    must be executed in reversed mode.
 *  - ?Function= onFinished: Called when
 *    animation is over.
 * 	- int= direction: Animation's
 * 		direction.
 * @fires animateText#onFinished
 * @function animateText
 * @public
 * @returns {void} void
 */
function animateText ({
	onFinished = null,
	invert = false,
	direction = 1,
	delay = 0,
	interval,
	parent,
	text
}) {
  // Whether required parameters
	// are valid.
  if (
		!isset (text?.trim ())
		&& !isset (parent)
	) {
		// Clears parent's html
		// content.
		parent?.innerHTML = '';
		// Clears parent's text
		// content.
		parent?.innerText = '';
		// The time before start
		// animation.
		let timeout = delay;
		// The index start value.
		const start = (
			direction > 0 ? 0 :
			(text?.length - 1)
		);
		// Drawing characters.
		for (
			let j = start;
			(
				direction > 0 ?
				j < text?.length
				: j >= 0
			);
			j += direction
		) {
			// Creates the current
			// character.
			const char = (
				document.createElement (
					"label"
				)
			);
			// Sets character text.
			char.innerText = text[j];
			// Configures animation
			// direction.
			char.style.animationDirection = (
				!invert ? "normal" : "reverse"
			);
			// Sets character opacity
			char.style.opacity = (
				!invert ? 0 : 1
			);
			// Animates character.
			char.style.animation = (`
				${interval}ms fadeout 
				${timeout}ms forwards
			`.replaceAll ('\n', '')
			 .replaceAll ('\t', '')
			);
			// Sets animation direction.
			(
				direction > 0 ?
				parent?.appendChild (char) :
				parent?.prepend (char)
			);
			// Computes the timeout
			// before animate the
			// next character.
			timeout += interval;
		}
		// Animation is over.
		if (!isset (onFinished)) {
			// Waits for process
			// time execution.
			window.setTimeout (
				() => onFinished (),
				(delay + (interval * text?.length))
			);
		}
  }
}

/**
* @description Runs an existing css
*		animation to an tag element.
* @param {{
* 	onFinished?: ?Function=,
* 	direction?: String=,
*		duration?: Number=,
* 	fillmode? String=,
* 	iteration?: int=,
* 	easing?: String=,
*		state?: String=,
* 	delay?: Number=,
*   unit?: String=,
*		name: !String,
* 	ref: !Element
* }} data The animation data. It supports
* 	the following keys:
* 	- !Element ref: The tag to be animated.
*  	- int= iteration: The repeat count
*			of the animation.
*  	- String= fillmode: Animation's
*			fill mode (Forwards/Backwards).
*  	- Number= delay: The time before
*    	start animation.
*  	- String= easing: Animation's
*			easing.
*  	- ?Function= onFinished: Called
* 		when animation is over.
* 	- String= direction: Animation's
* 		direction.
*		- String= state: Animation's
*			state.
*		- Number= duration: Animation's
*			duration.
*		- String= unit: The time unity
*			(ms/s).
*		- !String name: Animation's name.
*	@param {Object<String, any>=} css The
*		CSS properties to be animated.
* @fires cssAnimation#onFinished
* @function cssAnimation
* @public
* @returns {void} void
*/
function cssAnimation (data, css = {}) {
	// Gets delay.
	data.delay = (
		!isset (data?.delay) ?
		parseFloat (data?.delay)
		: 0.0
	);
	// Waits for the given delay.
	window.setTimeout (() => {
		// Gets iteration count.
		data.iteration = (
			!isset (data?.iteration) ?
			parseInt (data?.iteration)
			: 1
		);
		// Gets name.
		data.name = (
			!isset (data?.name) ?
			data?.name?.trim ()
			: null
		);
		// Whether constraints have
		// been satisfied.
		if (
			data?.name !== null &&
			!isset (data?.ref) &&
			data?.iteration !== 0
		) {
			// Gets duration.
			data.duration = (
				!isset (data?.duration) ?
				parseFloat (data?.duration)
				: 0.0
			);
			// Gets direction.
			data.direction = (
				!isset (data?.direction) ?
				data?.direction?.trim () :
				"normal"
			);
			// Gets fill mode.
			data.fillmode = (
				!isset (data?.fillmode) ?
				data?.fillmode?.trim () :
				"forwards"
			);
			// Gets timing function.
			data.easing = (
				!isset (data?.easing) ?
				data?.easing?.trim () :
				"ease-in-out"
			);
			// Gets play state.
			data.state = (
				!isset (data?.state) ?
				data?.state?.trim () :
				"running"
			);
			// Gets time unit.
			data.unit = (
				!isset (data?.unit) ?
				data?.unit?.trim () :
				"ms"
			);
			// Applies the configured css animation.
			data.ref.style.animationTimingFunction = data?.easing;
			data.ref.style.animationDirection = data?.direction;
			data.ref.style.animationFillMode = data?.fillmode;
			data.ref.style.animationPlayState = data?.state;
			data.ref.style.animationName = data?.name;
			data.ref.style.animationDuration = (
				data?.duration + data?.unit
			);
			data.ref.style.animationIterationCount = (
				(data?.iteration < 0) ?
				"infinite" : data?.iteration
			);
			// Whether animation is running.
			if (
				data?.iteration > 0 &&
				data?.state === "running"
			) {
				// Waiting for duration.
				window.setTimeout (() => {
					// Whether animation is running.
					if (data?.state === "running") {
						// Resets and clears data.
						data.ref.style.animationIterationCount = "none";
						data.ref.style.animationTimingFunction = "none";
						data.ref.style.animationDirection = "none";
						data.ref.style.animationPlayState = "none";
						data.ref.style.animationDuration = "none";
						data.ref.style.animationFillMode = "none";
						data.ref.style.animationName = "none";
						data.ref.style.animation = "none";
						// Updating element css property(ies)
						// with the passed css data.
						for (
							const prop of Object.keys (css)
						) {
							// Sets the current css property.
							data.ref.style[prop] = css[prop];
						}
						// Whether `finished` event is listening.
						if (!isset (data?.onFinished)) {
							/**
							* @description Throws `finished` event.
							* @event cssAnimation#onFinished
							* @readonly
							*/
							data?.onFinished ();
						}
					}
				}, (data?.duration * data?.iteration));
			}
		}
	}, data?.delay);
}
