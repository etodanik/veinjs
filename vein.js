/**
 *  vein.js - version 0.2.1
 *
 *  by Danny Povolotski (dannypovolotski@gmail.com)
 **/

!function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition()
    else if (typeof define == 'function' && define.amd) define(name, definition)
    else this[name] = definition()
}('vein', function () {
    var vein = function(){};

    // Get the stylesheet we use to inject stuff or create it if it doesn't exist yet
    vein.getStylesheet = function() {
        var self = this;

        if(!self.element) {
            self.element = document.createElement("style");
            self.element.setAttribute('type', 'text/css');
            self.element.setAttribute('id', 'vein');
            document.getElementsByTagName("head")[0].appendChild(self.element);

            // We have just appended our Stylesheet, - it's the last one in HEAD
            // TODO: Find a more reliable way to pair the element and the Stylesheet object?
            self.stylesheet = document.styleSheets[ document.styleSheets.length - 1 ];

            // rules / cssRules is for cross-browser compatability. IE/FF/WebKit call it differently
            self.rules = self.stylesheet[ document.all ? 'rules' : 'cssRules' ];
        }

        return self.element;
    };

    // Let's inject some CSS. We can supply an array (or string) of selectors, and an object
    // with CSS value and property pairs.
    vein.inject = function(selectors, css) {
        var self        =   this,
            element     =   self.getStylesheet(),
            si, sl, matches, ri, rl, cssText, property, mi, ml;

        if(typeof selectors === 'string') {
            selectors = [selectors];
        }

        for(si = 0, sl = selectors.length; si < sl; si++) {
            matches =   [];

            // Since there could theoretically be multiple versions of the same rule,
            // we will first iterate
            for(ri = 0, rl = self.rules.length; ri < rl; ri++) {
                if(self.rules[ri].selectorText === selectors[si]) {
                    if(css === null) {
                        // If we set css to null, let's delete that ruleset altogether
                        self.stylesheet.deleteRule(ri);
                    }
                    else {
                        // Otherwise - we push it into the matches array
                        matches.push(self.rules[ri]);
                    }
                }
            }

            // If all we wanted is to delete that ruleset, we're done here
            if(css === null) return;

            // If no rulesets have been found for the selector, we will create it below
            if(matches.length === 0) {
                cssText = [];

                for(property in css) {
                    if (css.hasOwnProperty(property)) {
                        cssText.push(property + ': ' + css[property] + ';');
                    }
                }
                joined = cssText.join('');
                cssText = selectors[si] + '{' + joined + '}';
                if ( self.stylesheet.insertRule ) {
                    self.stylesheet.insertRule(cssText, self.rules.length);
                } else {
                    self.stylesheet.addRule( selectors[si] , joined , self.rules.length );
                }
            }

            // Otherwise, we're just going to modify the property
            else {
                for(mi = 0, ml = matches.length; mi < ml; mi++) {
                    for(property in css) {
                        if (css.hasOwnProperty(property)) {
                            // TODO: Implement priority
                            matches[mi].style.setProperty(property, css[property], '');
                        }
                    }
                }
            }
        }

        return self;
    };

    return vein;
});
