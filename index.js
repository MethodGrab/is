'use strict';

var is;
var ua;


// :: ( userAgent: ?string ) → module: object
// Constructor
module.exports = is = function ( userAgent ) {

	if ( typeof userAgent === 'string' ) {
		ua = userAgent;
	} else if ( typeof navigator === 'object' && navigator.userAgent ) {
		ua = navigator.userAgent;
	} else {
		throw new Error( 'A user agent is required. You must pass one to the constructor or `navigator.userAgent` must exist' );
	}

	return module.exports;

};


// :: () → { major: number, minor: number }
// Get the iOS version (major & minor) from a UA.
// Defaults to -1 for both if the device is not iOS.
is.getIosVersion = function (  ) {

	var ret = {
		major : -1,
		minor : -1,
	};

	try {
		var matches = ua.match( /(?:iPod|iPhone|iPad).*(?:OS) (\d+)_(\d+)\s+/ );

		if ( matches ) {
			ret = {
				major: parseInt( matches[1], 10 ),
				minor: parseInt( matches[2], 10 ),
			};
		}

	} catch ( err ) {
		console.error( err );
	}

	return ret;

};


// :: [ [ methodName: string, regex: string ] ]
// Shortcut for tests that only require a single regex to be tested
var regexMethods = [
	[ 'iOS', '(iPod|iPhone|iPad)' ],
	[ 'chrome', 'Chrome' ],
	[ 'ie9', 'MSIE 9.0' ],
	[ 'ie10', 'MSIE 10.0' ],
	[ 'ie11', 'rv:11.0' ],
	[ 'edge', 'Edge' ],
];

regexMethods.forEach(function ( method ) {
	var re = new RegExp( method[1] );

	// :: () → bool
	// Does the UA indicate that the device is `method[0]`
	is[ method[0] ] = function (  ) {
		return re.test( ua );
	};
});


// :: () → bool
// Does the UA indicate that the device is Safari
is.safari = function (  ) {
	 return /Safari/.test( ua ) && !is.chrome();
};
