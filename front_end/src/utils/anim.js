/**
* @project Simple Student Saver - https://obrymec.github.io/simple_student_saver
* @fileoverview Defines some methods to manage frequent animations.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-11-19
* @updated 2023-11-05
* @version 1.0.1
* @file anim.js
*/

/**
 * @description Animates text.
 * @param {{
 * 	onFinished?: ?Function=,
 * 	reverse?: boolean=,
 * 	target: !Element,
 * 	interval?: int=,
 * 	text: !String
 * }} data The animation data.
 * 	It supports the following
 * 	keys:
 *
 * 	- Function onFinished: Called
 * 		when animation is over.
 *
 * 	- Element target: The element
 * 		where his text content will
 * 		be animated.
 *
 * 	- String text: The text to
 * 		get animation.
 *
 * 	- int interval: The timeout
 * 		between each character
 * 		draw.
 *
 * 	- boolean reverse: Whether
 * 		we want to reverse the
 * 		previous animation.
 * @fires animateText#onFinished
 * @function animateText
 * @returns {void} void
 */
function animateText ({
	onFinished = null,
	reverse = false,
	interval = 25,
	target,
	text
}) {
	// Animates the passed text.
	const anim = new Typewriter (
		target, {
			delay: interval,
			cursor: ''
		}
	);
	// Whether animation is normal.
	if (!reverse) {
		// Writes the given string.
		anim.typeString (text);
		// Starts the process.
		anim.start ();
	// Otherwise.
	} else {
		// Sets the target tag
		// text content.
		target.textContent = (
			text
		);
		// Backspaces written
		// characters.
		backspace ({
			tag: target,
			interval
		});
	}
	// Waits for animation
	// get over.
	window.setTimeout (() => {
		// Whether `finished`
		// event is listening.
		if (
			typeof onFinished
				=== "function"
		) {
			/**
			 * @description Throws `finished`
			 *  event.
			 * @event animateText#finish
			 * @readonly
			 * @emits
			 */
			onFinished ();
		}
	}, (interval * text.length));
}

/**
 * @description Hides and shows
 *  the title bar.
 * @param {boolean} visible If
 *  we want to show or hide
 *  the title bar.
 * @param {?Function=} finish
 *  Called when the title bar
 * 	animation is over.
 * @fires setTitleBarVisibility#finish
 * @function setTitleBarVisibility
 * @public
 * @returns {void} void
 */
function setTitleBarVisibility (
  visible,
  finish = null
) {
  // The global header tag ref.
  const header = (
    document.querySelector (
      "header"
    )
  );
  // Whether the visibility
  // is set to `false`.
  if (!visible) {
    // Hides the title bar.
    cssAnimation (
      {
        direction: "reverse",
        name: "translate",
        duration: 200,
        ref: header,
        finish
      },
      {
        transform: (
					"translateY(-120%)"
				)
      }
    );
  // Otherwise.
  } else {
    // Shows the title bar.
    cssAnimation (
      {
        name: "translate",
        duration: 200,
        ref: header,
        finish
      },
      {
        transform: (
					"translateY(0)"
				)
      }
    );
  }
}

/**
 * @description Backspaces all characters
 *  of a text content from a given tag.
 * @param {{
 *  onBackspace?: Function (String),
 *  onFinished?: Function (String),
 *  invert?: boolean=,
 *  interval?: int=,
 *  tag: Element
 * }} data The method data configurations.
 *  It supports the following keys:
 *
 *  - int interval: The timeout between
 *    each backspace.
 *
 *  - boolean invert: Whether we want to
 *    reverse the backspace direction.
 *
 *  - Function onFinished: Called when
 *    the backspace effect is over.
 *
 *  - Element tag: The target markup
 *    that will be affected by the
 *    effect.
 *
 *  - Function onBackspace: Called at
 *    every time when a backspace is
 *    made over tag's text content.
 * @fires backspace#onBackspace
 * @fires backspace#onFinished
 * @function backspace
 * @public
 * @returns {int} int
 */
function backspace ({
  onBackspace = null,
  onFinished = null,
  invert = false,
  interval = 140,
  tag = null
}) {
  // Backspacing characters.
  const animation = (
    window.setInterval (
      () => {
        // The current corrected
        // tag's text content.
        tag.textContent = (
          clearStr (
						tag.textContent
					)
        );
        // The current text
        // content size.
        const size = (
          tag.textContent
            .length
        );
        // Whether the text
        // length is bigger
        // than one.
        if (size > 1) {
          // Whether direction
          // is normal.
          if (!invert) {
            // Removes the first
            // character.
            tag.textContent = (
              tag.textContent
                .split ('')
                .slice (1, size)
                .join ('')
            );
          // Otherwise.
          } else {
            // Removes the last
            // character.
            tag.textContent = (
              tag.textContent
                .split ('')
                .slice (
                  0, (size - 1)
                ).join ('')
            );
          }
          // Whether `onBackspace`
          // event is listening.
          if (
            typeof onBackspace
              === "function"
          ) {
            /**
             * @description Throws
             *  `onBackspace` event.
             * @property {String} rest
             *  The rest of backspaced
             *  text.
             * @event backspace#onBackspace
             * @readonly
             * @emits
             */
            onBackspace (
              tag.textContent
            );
          }
        // Otherwise.
        } else {
          // Clears text content.
          tag.textContent = '';
          // Kills animation.
          window.clearInterval (
            animation
          );
          // Whether `onFinished`
          // event is listening.
          if (
            typeof onFinished
              === "function"
          ) {
            /**
             * @description Throws
             *  `onFinished` event.
             * @property {String} rest
             *  The rest of backspaced
             *  text.
             * @event backspace#onFinished
             * @readonly
             * @emits
             */
            onFinished (
              tag.textContent
            );
          }
        }
      },
      interval
    )
  );
  // Returns the process
  // id.
  return animation;
}

/**
 * @description Runs an existing css
 *	animation to a tag element.
 * @param {{
 * 	finish?: ?Function=,
 * 	direction?: String=,
 *	duration?: Number=,
 * 	fillmode? String=,
 * 	iteration?: int=,
 * 	easing?: String=,
 *	state?: String=,
 * 	delay?: Number=,
 *  unit?: String=,
 *	name: !String,
 * 	ref: !Element
 * }} data The animation data. It
 *		supports the following keys:
 *
 * 	- Element ref: The tag to be
 *    animated.
 *
 *  - int iteration: The repeat count
 * 		of the animation.
 *
 *  - String fillmode: The animation
 *		fill mode (Forwards/Backwards).
 *
 *  - Number delay: The time before
 *    start animation.
 *
 * 	- String easing: The animation
 *		easing.
 *
 * 	- Function finish: Called when
 * 		animation is over.
 *
 * 	- String direction: The animation
 * 		direction.
 *
 *	- String state: The animation state.
 *
 *	- Number duration: The animation
 *		duration.
 *
 *	- String unit: The time unity (ms/s).
 *
 *	- String name: The animation name.
 * @param {Object<String, any>=} css
 *	The css properties to animate.
 * @fires cssAnimation#onFinished
 * @function cssAnimation
 * @public
 * @returns {void} void
 */
function cssAnimation (
	{
		iteration,
		direction,
		duration,
		fillmode,
		finish,
 	 	easing,
 		state,
 	 	delay,
 	  unit,
 		name,
	 	ref
	},
	css = {}
) {
	// Gets delay.
	delay = (
		!isset (delay) ?
		parseFloat (delay)
		: 0.0
	);
	// Waits for the given delay.
	window.setTimeout (() => {
		// Gets iteration count.
		iteration = (
			!isset (iteration) ?
			parseInt (iteration)
			: 1
		);
		// Gets name.
		name = (
			!isset (name) ?
			name.trim ()
			: null
		);
		// Whether constraints
		// have been satisfied.
		if (
			name !== null &&
			!isset (ref) &&
			iteration !== 0
		) {
			// Gets duration.
			duration = (
				!isset (duration) ?
				parseFloat (duration)
				: 0.0
			);
			// Gets direction.
			direction = (
				!isset (direction) ?
				direction.trim () :
				"normal"
			);
			// Gets fill mode.
			fillmode = (
				!isset (fillmode) ?
				fillmode.trim () :
				"forwards"
			);
			// Gets timing function.
			easing = (
				!isset (easing) ?
				easing.trim () :
				"ease-in-out"
			);
			// Gets play state.
			state = (
				!isset (state) ?
				state.trim () :
				"running"
			);
			// Gets time unit.
			unit = (
				!isset (unit) ?
				unit.trim () :
				"ms"
			);
			// Applies the configured css animation.
			ref.style.animationTimingFunction = easing;
			ref.style.animationDirection = direction;
			ref.style.animationFillMode = fillmode;
			ref.style.animationPlayState = state;
			ref.style.animationName = name;
			ref.style.animationDuration = (
				duration + unit
			);
			ref.style.animationIterationCount = (
				(iteration < 0) ? "infinite" : iteration
			);
			// Whether animation is running.
			if (iteration > 0 && state === "running") {
				// Waiting for duration.
				window.setTimeout (() => {
					// Whether animation is running.
					if (state === "running") {
						// Resets and clears data.
						ref.style.animationIterationCount = "none";
						ref.style.animationTimingFunction = "none";
						ref.style.animationDirection = "none";
						ref.style.animationPlayState = "none";
						ref.style.animationDuration = "none";
						ref.style.animationFillMode = "none";
						ref.style.animationName = "none";
						ref.style.animation = "none";
						// Updating element css
						// property(ies) with
						// the passed data.
						for (
							const prop of Object.keys (css)
						) {
							// Sets the current
							// css property.
							ref.style[prop] = css[prop];
						}
						// Whether `finish` event
						// is listening.
						if (
							typeof finish === "function"
						) {
							/**
							 * @description Throws `finish`
							 *  event.
							 * @event cssAnimation#finish
							 * @readonly
							 * @emits
							 */
							finish ();
						}
					}
				}, (duration * iteration));
			}
		}
	}, delay);
}
