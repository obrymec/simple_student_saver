`
<!--Header text title-->
				<div class = "title-zone"><label></label></div>
				<!--Back button: to return to study sign up web page-->
				<div class = "icon-zone" title = "Désirez-vous revenir à la page d'inscription des étudiants ?">
					<!--Back button as svg icon definition-->
					<svg height = "24px" viewBox = "0 0 48 48" width = "24px" id = "back-btn">
						<path d = "M0 0h48v48h-48z" fill = "none"/>
						<path d = "M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z"/>
					</svg>
				</div>

<script type = "text/javascript">
				// Hides and shows app title bar.
			    function title_bar_visibility (visible, finished = null) {
			    	// Shows the title bar.
			    	if (visible) apply_css_animation (new Object ({
						name: "translate", duration: 200, ref: document.querySelector ("div.global-header"), finish: finished
			    	}), new Object ({transform: "translateY(0)"}));
			    	// Otherwise.
			    	else apply_css_animation (new Object ({
						name: "translate", duration: 200, direction: "reverse", ref: document.querySelector ("div.global-header"), finish: finished
			    	}), new Object ({transform: "translateY(-120%)"}));
			    }

				// Fixing browser "offline" event.
				window.addEventListener ("offline", () => alert ("Votre navigateur viens d'ếtre mis hors réseau."));
				// Fixing browser "online" event.
				window.addEventListener ("online", () => window.location.reload ());
				// Checks the browser url link.
				if (window.location.href.endsWith ("students")) $ ("div.views").load ("./html/study_data.html");
				// Otherwise.
				else $ ("div.views").load ("./html/study_sign_up.html");
			</script>

`