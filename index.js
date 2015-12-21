'use strict';

var is;
var ua;


/**
 * Constructor
 * @param  {string}  userAgent Optional user agent to test against
 *                             Defaults to navigator.userAgent
 * @return {object}            API methods
 */
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


/**
 * Get the iOS version in use
 * Defaults to -1 for both versions if the device is not iOS
 * @return {object} version.major & version.minor
 */
is.getIosVersion = function (  ) {

	var res = {
		major: -1,
		minor: -1
	};

	try {
		var matches = ua.match( /(?:iPod|iPhone|iPad).*(?:OS) (\d+)_(\d+)\s+/ );

		if ( matches ) {
			res = {
				major: parseInt( matches[1], 10 ),
				minor: parseInt( matches[2], 10 )
			};
		}

	} catch ( err ) {
		console.error( err );
	}

	return res;

};


/**
 * Is the device running iOS
 * @return {boolean} yes/no
 */
is.iOS = function (  ) {
	return /(iPod|iPhone|iPad)/.test( ua );
};


/**
 * Is the device running Safari
 * @return {boolean} yes/no
 */
is.safari = function (  ) {
	 return /Safari/.test( ua ) && !is.chrome();
};


/**
 * Is the device running Chrome
 * @return {boolean} yes/no
 */
is.chrome = function (  ) {
	 return /Chrome/.test( ua );
};


/**
 * Is the device running IE9
 * @return {boolean} yes/no
 */
is.ie9  = function (  ) {
	 return /MSIE 9.0/.test( ua );
};


/**
 * Is the device running IE10
 * @return {boolean} yes/no
 */
is.ie10 = function (  ) {
	 return /MSIE 10.0/.test( ua );
};


/**
 * Is the device running IE11
 * @return {boolean} yes/no
 */
is.ie11 = function (  ) {
	 return /rv:11.0/.test( ua );
};


/**
* Is the device running Microsoft Edge
* @return {boolean} yes/no
*/
is.edge = function (  ) {
	return /Edge/.test( ua );
};
