// Checks whether a variable is not undefined and null.
function is_empty (attr) {
    // Makes a test.
    return (attr === undefined || attr === null || String (attr).trim ().length === 0);
}

// Makes some ajax request with a link and his data.
function ajax_request (link, method, data, success = null, failed = null) {
	// Creating a new "xml http request".
	let xhr = new XMLHttpRequest ();
    // Opens the xhr with the passed parameters.
    xhr.open (method, link, true);
	// Changes the default header.
	xhr.setRequestHeader ("Content-type", "application/json;charset=UTF-8");
	// Sends the passed data.
	xhr.send (JSON.stringify (data));
    // Listens server requests.
    xhr.onload = () => {
		// A 200 status has been returned.
		if (xhr.status === 200) if (!is_empty (success)) success (JSON.parse (xhr.responseText), xhr.status);
		// Otherwise.
		else if (!is_empty (failed)) failed (xhr.status);
	}
}

// Returns a capitalized shape of a string.
function str_capitalize (text) {
    // Checks the given value.
    if (!is_empty (text)) {
        // Initializes the final result.
        let result = String ('');
        // Splits the passed text.
        text = text.split (' ');
        // Generates the final result.
        text.forEach ((string, index) => {
            // Generates a capitalized form of the current string.
            string = (string [0].toLocaleUpperCase () + string.replace (string [0], ''));
            // Generates the result for each string.
            result = (index === 0) ? string : (result + ' ' + string);
        });
        // Returns the final result.
        return result;
    // Returns a null value for other cases.
    } else return null;
}

// Animates label text infos content.
function animate_text (parent, text, interval, delay = 0, dir = 1, invert = false, finished = null) {
   // The given text is not empty.
   if (!is_empty (parent) && !is_empty (String (text).trim ())) {
   	    // Contains the passed delay and removes the preview characters.
        parent.innerHTML = '';
        parent.innerText = '';
        let timeout = delay;
        // Draws each character from the text.
        for (let j = (dir > 0 ? 0 : (text.length - 1)); (dir > 0 ? j < text.length : j >= 0); j += dir) {
            // Generates a label tag for each given character.
            let lb = document.createElement ("label");
            lb.style.opacity = (!invert ? 0 : 1);
            lb.innerText = text [j];
            lb.style.animation = (interval + "ms fadeout " + timeout + "ms forwards");
            lb.style.animationDirection = (!invert ? "normal" : "reverse");
            (dir > 0 ? parent.appendChild (lb) : parent.prepend (lb));
            timeout += interval;
        }
        // Animation is over.
        if (!is_empty (finished)) window.setTimeout (() => finished (), (delay + (interval * text.length)));
   }
}

// Runs an existing css animation to an tag element.
function apply_css_animation (data, css = {}) {
    // Getting animation delay.
    data.delay = (!is_empty (data.delay) ? parseFloat (data.delay) : 0.0);
    // Waiting for the user delay.
    window.setTimeout (() => {
        // Getting animation iteration count.
        data.iteration = (!is_empty (data.iteration) ? parseInt (data.iteration) : 1);
        // Getting animation name.
        data.name = (!is_empty (data.name) ? String (data.name).trim () : null);
        // Checks the tag element reference.
        if (!is_empty (data.ref) && data.name !== null && data.iteration !== 0) {
            // Getting animation direction.
            data.direction = (!is_empty (data.direction) ? String (data.direction).trim () : "normal");
            // Getting animation fill mode.
            data.fillmode = (!is_empty (data.fillmode) ? String (data.fillmode).trim () : "forwards");
            // Getting animation timing function.
            data.easing = (!is_empty (data.easing) ? String (data.easing).trim () : "ease-in-out");
            // Getting animation play state.
            data.state = (!is_empty (data.state) ? String (data.state).trim () : "running");
            // Getting animation duration.
            data.duration = (!is_empty (data.duration) ? parseFloat (data.duration) : 0.0);
            // Getting animation time unit.
            data.unit = (!is_empty (data.unit) ? String (data.unit).trim () : "ms");
            // Apply the configured css animation.
            data.ref.style.animationIterationCount = ((data.iteration < 0) ? "infinite" : data.iteration);
            data.ref.style.animationDuration = (data.duration + data.unit);
            data.ref.style.animationTimingFunction = data.easing;
            data.ref.style.animationDirection = data.direction;
            data.ref.style.animationFillMode = data.fillmode;
            data.ref.style.animationPlayState = data.state;
            data.ref.style.animationName = data.name;
            // Waiting for animation running.
            if (data.iteration > 0 && data.state === "running") {
                // Waiting for animation duration.
                window.setTimeout (() => {
                    // The current animation is it running ?
                    if (data.state === "running") {
                        // Resets and clears animation data.
                        data.ref.style.animationIterationCount = "none";
                        data.ref.style.animationTimingFunction = "none";
                        data.ref.style.animationDirection = "none";
                        data.ref.style.animationPlayState = "none";
                        data.ref.style.animationDuration = "none";
                        data.ref.style.animationFillMode = "none";
                        data.ref.style.animationName = "none";
                        data.ref.style.animation = "none";
                        // Updates element css property(ies) with the passed css data.
                        for (let property of Object.keys (css)) data.ref.style [property] = css [property];
                        // Calls a callback when animation is over.
                        if (!is_empty (data.finish)) data.finish ();
                    }
                }, (data.duration * data.iteration));
            }
        }
    }, data.delay);
}
