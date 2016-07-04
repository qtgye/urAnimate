(function (_w,_d) {

/**
 * --------------------------------------------------------------------------------
 * UTILITIES
 * --------------------------------------------------------------------------------
 */

// Checker utility
// Snippet taken from https://raw.githubusercontent.com/juliangarnier/anime/master/anime.js

var is = (function() {
    return {
      array:  function(a) { return Array.isArray(a) },
      object: function(a) { return Object.prototype.toString.call(a).indexOf('Object') > -1 }
    }
  })();





/**
 * --------------------------------------------------------------------------------
 * PRIVATE VARIABLES
 * --------------------------------------------------------------------------------
 */

var builtInEasings = {

	'linear' : function (t,b,c,d) {
					t/=d;
					return b+c*(t);
				},

	'inCubic' : function (t,b,c,d) {
					var tc=(t/=d)*t*t;
					return b+c*(tc);
				},	

	'outCubic' : function (t,b,c,d) {
					var ts=(t/=d)*t;
					var tc=ts*t;
					return b+c*(tc + -3*ts + 3*t);
				},	

	'InOutCubic' : function (t,b,c,d) {
					var ts=(t/=d)*t;
					var tc=ts*t;
					return b+c*(-2*tc + 3*ts);
				}

}




/**
 * --------------------------------------------------------------------------------
 * CORE
 * --------------------------------------------------------------------------------
 */



/**
 * Binds animation to an element
 * @params
 * 	 Can be any of the following patterns:
 * 	 - If called as a method of an element :
 * 	 	HTMLElement.urAnimate( properties, duration, easing )
 * 	 - If called statically :
 * 	 	window.UrAnimate( element, properties, duration, easing );
 *
 * @params {HTMLELement} element, the HTML element to animate
 * @params {Object} properties, a key-value list of CSS properties ( e.g., { 'fontSize' : '14px', width : 300 } )
 * @params {Number} duration, the total runtime in miliseconds ( e.g., 3000 )
 * @params {string | function} easing, the Easing type ( e.g. 'linear' | 'easeOut' | <a callback function in Tim Groleau's format> )
 */
function UrAnimate() {

	var el,properties,duration,easing,
		startTime = Date.now();

	// Check if HTML Element is supplied as argument or bound
	if ( (arguments[0].selector || arguments[0].nodeType) && is.object(arguments[1]) ) {
		el 			= arguments[0].selector ? arguments[0][0] : arguments[0];
		properties 	= arguments[1];
		duration 	= arguments[2] ? arguments[2] : 300;
		easing 	 	= arguments[3] ? arguments[3] : 'linear';
	} else if ( (this.selector || this.nodeType) && is.object(arguments[0]) ) {
		el 			= this.selector ? this[0] : this;
		properties 	= arguments[0];
		duration 	= arguments[1] ? arguments[1] : 300;
		easing 	 	= arguments[2] ? arguments[2] : 'linear';
	} else {
		console.log('not valid',this);
		return;
	}

	// Filter properties 
	properties 	= 	Object.keys(properties).filter(function (property) {

						var digits = String(properties[property]).match(/\d/); // Check property value for valid digits						
						if ( digits && digits.length ) return true; // Return if has valid digits

					// Customize format
					}).map(function (property) {

						var prop 				= property.replace(/-[a-z]/,function(matched){ return matched[1].toUpperCase(); });
						var	initialValue 		= _w.getComputedStyle(el)[prop]; // Get initial value
						var	initialValueDigits 	= initialValue.match(/\d+([.]\d+)?/); // parse the digits
						
						// Check if there is any digit, otherwise use 0
						initialValueDigits = initialValueDigits[0] ? parseFloat(initialValueDigits[0]) : 0;

						return {
							property 		 	: property,
							initial 		 	: initialValueDigits,
							target 			 	: properties[property],
							targetDifference 	: parseFloat(properties[property]) - initialValueDigits
						}
					});


	// Animates the properties
	function animateProperties() {
		var now 		= Date.now(),
			elapsed 	= (now - startTime),
			next		= true;

		properties.forEach(function (_property,key) {	
			
			var	duration		= is.array(this) ? (this[key]?this[key]:this[this.length-1]) : this,
				progress 		= elapsed/duration,
				// if supplied easing is array, get the corresponding index if available, otherwise get the last,
				// if supplied easing is string or function, select from buitInEasings or run it
				easingCallback	= is.array(easing) ? ( easing[key] ? easing[key] : easing[easing.length-1] ) : easing, 
				newValue 		= getNewValue(  progress >= 1 ? 1 : progress , _property.initial, _property.targetDifference, easingCallback);
			// Apply
			el.style[_property.property] = String(_property.target).replace(/\d+([.]\d+)?/,newValue);
			// Check if continue
			next = progress < 1;
		}.bind(duration));

		if ( next ) {
			_w.requestAnimationFrame(animateProperties);
		}		
	}


	// Initialize animation
	_w.requestAnimationFrame(animateProperties);

};



/**
 * --------------------------------------------------------------------------------
 * PRIVATE FUNCTIONS
 * --------------------------------------------------------------------------------
 */

function getNewValue(progress,initialValue,targetDifference,easing) {
	return (
		typeof 	easing == 'string' && easing in builtInEasings ? builtInEasings[easing] : 
				easing instanceof Function ? easing : function (t,b,c,d) {
					// easing is neither one of the buildInEasings nor a valid function callback,
					// just return the initial value
					return b;
				}
	)(progress,initialValue,targetDifference,1);
}


// Bind to HTMLElement and jQuery element
HTMLElement.prototype.urAnimate = _w.UrAnimate = UrAnimate;
if ( $ == jQuery ) { jQuery.fn.urAnimate = UrAnimate; }


})(window,document);