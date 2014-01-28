(function($) {

	var vein = function(){};

	// Get the stylesheet we use to inject stuff or create it if it doesn't exist yet
	vein.prototype.getStylesheet = function(){
		var self = this;

		if(!self.$element){
			self.$element = $('<style type="text/css" media="screen" id="vein"></style>');

			$('head').append(self.$element);

			// We have just appended our Stylesheet, - it's the last one in HEAD
			// TODO: Find a more reliable way to pair the element and the Stylesheet object?
			self.stylesheet = document.styleSheets[ document.styleSheets.length - 1 ];
			// rules / cssRules is for cross-browser compatability. IE/FF/WebKit call it differently
			self.rules = document.styleSheets[ document.styleSheets.length - 1 ][ document.all ? 'rules' : 'cssRules' ];
		}

		return self.$element;
	}

	// Let's inject some CSS. We can supply an array (or string) of selectors, and an object
	// with CSS value and property pairs.
	vein.prototype.inject = function(selectors, css) {
		var $element 	= 	this.getStylesheet(),
			self 		=	this;

		if(typeof selectors === 'string'){
			selectors = [selectors];
		}

		$.each(selectors, function(i, selector){
			var matches	=	[];

			// Since there could theoretically be multiple versions of the same rule,
			// we will first iterate
			$.each(self.rules, function(k, rule){
				if(rule.selectorText === selector){
					if(css === null){
						// If we set css to null, let's delete that ruleset altogether
						self.stylesheet.deleteRule(k);
					} else {
						// Otherwise - we push it into the matches array
						matches.push(rule);
					}
				}
			});

			// If all we wanted is to delete that ruleset, we're done here
			if(css === null) return;

			if(matches.length === 0){	// If no rulesets have been found for the selector, we will create it below
				var cssText = [];

				$.each(css, function(property, value){
					cssText.push(property + ': ' + value + ';');
				});
				cssText = selector + '{' + cssText.join('') + '}';
				self.stylesheet.insertRule(cssText, self.rules.length);
			} else {					// Otherwise, we're just going to modify the property
				$.each(matches, function(i, match){
					$.each(css, function(property, value){
						// TODO: Implement priority
						match.style.setProperty(property, value, '');
					});
				});
			}
		});

		return self;
	};

	$.vein = new vein();

}(jQuery));