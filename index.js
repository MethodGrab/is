'use strict';

let is;
let ua;


// :: ( userAgent: ?string ) → module: object
// Constructor
module.exports = is = function ( userAgent = false ) {
	ua = getUa( userAgent );
	return module.exports;
};


// :: ( userAgent: string ) → string
// Get the current user agent to test against
function getUa( userAgent = false ) {
	if ( typeof userAgent === 'string' ) {
		return userAgent;
	} else if ( typeof navigator === 'object' && navigator.userAgent ) {
		return navigator.userAgent;
	} else if ( ua ) {
		return ua;
	}

	throw new Error( 'A user agent is required. You must pass one to the constructor or `navigator.userAgent` must exist' );
}


// :: () → { major: number, minor: number, patch: number }
// Get the iOS version (major & minor) from a UA.
// Defaults to -1 for both if the device is not iOS.
is.getIosVersion = function (  ) {

	let ret = {
		major : -1,
		minor : -1,
		patch : -1,
	};

	try {
		const matches = getUa().match( /(?:iPod|iPhone|iPad).*(?:OS) (\d+)_(\d+)_?(\d+)?\s/ );

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
	[ 'iOS', '(iPod|iPhone|iPad)' ],
	[ 'chrome', 'Chrome' ],
	[ 'ie9', 'MSIE 9.0' ],
	[ 'ie10', 'MSIE 10.0' ],
	[ 'ie11', 'rv:11.0' ],
	[ 'edge', 'Edge' ],
];

regexMethods.forEach( ( method ) => {
	const re = new RegExp( method[1] );

	// :: () → bool
	// Does the UA indicate that the device is `method[0]`
	is[ method[0] ] = function (  ) {
		return re.test( getUa() );
	};
});


// :: () → bool
// Does the UA indicate that the device is Safari
is.safari = function (  ) {
	return /Safari/.test( getUa() ) && !is.chrome();
};
