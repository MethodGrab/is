'use strict';

let is;
let userAgent;


// :: ( ua: ?string ) → module: object
// Constructor
module.exports = is = function ( ua = false ) {
	userAgent = ua;
	return module.exports;
};


// :: ( ua: string ) → string
// Get the current user agent to test against
function getUa( ua = false ) {
	if ( typeof ua === 'string' ) {
		return ua;
	} else if ( typeof navigator === 'object' && navigator.userAgent ) {
		return navigator.userAgent;
	} else if ( userAgent ) {
		return userAgent;
	}

	throw new Error( 'A user agent is required. You must pass one to the constructor, method or `navigator.userAgent` must exist' );
}


// :: ( ua: ?string ) → { major: number, minor: number, patch: number }
// Get the iOS version (major & minor) from a UA.
// Defaults to -1 for both if the device is not iOS.
is.iosVersion = function ( ua = false ) {

	let ret = {
		major : -1,
		minor : -1,
		patch : -1,
	};

	try {
		const matches = getUa( ua ).match( /(?:iPod|iPhone|iPad).*(?:OS) (\d+)_(\d+)_?(\d+)?\s/ );

		if ( matches ) {
			ret = {
				major: parseInt( matches[1], 10 ),
				minor: parseInt( matches[2], 10 ),
				patch: parseInt( matches[3] || -1, 10 ),
			};
		}

	} catch ( err ) {
		console.error( err );
	}

	return ret;

};


// :: [ [ methodName: string, regex: string ] ]
// Shortcut for tests that only require a single regex to be tested
const regexMethods = [
	[ 'ios', '(iPod|iPhone|iPad)' ],
	[ 'chrome', 'Chrome' ],
	[ 'ie9', 'MSIE 9.0' ],
	[ 'ie10', 'MSIE 10.0' ],
	[ 'ie11', 'rv:11.0' ],
	[ 'edge', 'Edge' ],
];

regexMethods.forEach( ( method ) => {
	const re = new RegExp( method[1] );

	// :: ( ua: ?string ) → bool
	// Does the UA indicate that the device is `method[0]`
	is[ method[0] ] = function ( ua = false ) {
		return re.test( getUa( ua ) );
	};
});


// :: ( ua: ?string ) → bool
// Does the UA indicate that the device is Safari
is.safari = function ( ua = false ) {
	return /Safari/.test( getUa( ua ) ) && !is.chrome( ua );
};


// :: ( ua: ?string ) → bool
// Does the UA indicate that the device is IE
is.ie = function ( ua = false ) {
	return /MSIE/.test( getUa( ua ) ) || is.ie11( ua );
};
