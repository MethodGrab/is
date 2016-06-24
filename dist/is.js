(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var is = void 0;
var userAgent = void 0;

// :: ( ua: ?string ) → module: object
// Constructor
module.exports = is = function is() {
	var ua = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	userAgent = ua;
	return module.exports;
};

// :: ( ua: string ) → string
// Get the current user agent to test against
function getUa() {
	var ua = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	if (typeof ua === 'string') {
		return ua;
	} else if ((typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === 'object' && navigator.userAgent) {
		return navigator.userAgent;
	} else if (userAgent) {
		return userAgent;
	}

	throw new Error('A user agent is required. You must pass one to the constructor, method or `navigator.userAgent` must exist');
}

// :: ( ua: ?string ) → { major: number, minor: number, patch: number }
// Get the iOS version (major & minor) from a UA.
// Defaults to -1 for both if the device is not iOS.
is.iosVersion = function () {
	var ua = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];


	var ret = {
		major: -1,
		minor: -1,
		patch: -1
	};

	try {
		var matches = getUa(ua).match(/(?:iPod|iPhone|iPad).*(?:OS) (\d+)_(\d+)_?(\d+)?\s/);

		if (matches) {
			ret = {
				major: parseInt(matches[1], 10),
				minor: parseInt(matches[2], 10),
				patch: parseInt(matches[3] || -1, 10)
			};
		}
	} catch (err) {
		console.error(err);
	}

	return ret;
};

// :: [ [ methodName: string, regex: string ] ]
// Shortcut for tests that only require a single regex to be tested
var regexMethods = [['ios', '(iPod|iPhone|iPad)'], ['chrome', 'Chrome'], ['ie9', 'MSIE 9.0'], ['ie10', 'MSIE 10.0'], ['ie11', 'rv:11.0'], ['edge', 'Edge']];

regexMethods.forEach(function (method) {
	var re = new RegExp(method[1]);

	// :: ( ua: ?string ) → bool
	// Does the UA indicate that the device is `method[0]`
	is[method[0]] = function () {
		var ua = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

		return re.test(getUa(ua));
	};
});

// :: ( ua: ?string ) → bool
// Does the UA indicate that the device is Safari
is.safari = function () {
	var ua = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	return (/Safari/.test(getUa(ua)) && !is.chrome(ua)
	);
};

// :: ( ua: ?string ) → bool
// Does the UA indicate that the device is IE
is.ie = function () {
	var ua = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	return (/MSIE/.test(getUa(ua)) || is.ie11(ua)
	);
};

},{}]},{},[1]);
