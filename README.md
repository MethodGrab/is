# is.js
UA detection.
Feature detection should be used where possible but sometimes it's not enough.


## Usage

### Basic
```js
var is = require( 'is' )();

is.ios(); // `true` on iOS devices, `false` elsewhere
```

### Custom UA
You can pass a custom user agent when initializing the library:

```js
var is = require( 'is' )( 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36' );
is.ios(); // always `false`
```


## Uses

1. iOS 7 `vh` unit workaround

```js
function iosVhFix(  ) {
	$( '.js-fix-vh' ).each( function ( idx, el ) {
		var height = $( el ).height();
		$( el ).css( 'min-height', height );
	});
}

// vh units are buggy in iOS <8 so require a JavaScript workaround
// https://github.com/scottjehl/Device-Bugs/issues/36
if ( is.ios() && is.iosVersion().major < 8 ) {
	// either use fallback CSS
	$( 'html' ).addClass( 'no-vhunits' );

	// or use JS to calculate the min-height
	iosVhFix();
	$( window ).bind( 'resize', iosVhFix );
}
```


## API

### `is.iosVersion()`
Returns an `object` with the `major`, `minor` & `patch` versions of iOS.  
The values for each will be `-1` if undefined or not iOS.  
Example: iOS 9.3.2 → `{ major: 9, minor: 3, patch: 2 }`  
Example: iOS 9.0 → `{ major: 9, minor: 0, patch: -1 }`  
Example: OS X → `{ major: -1, minor: -1, patch: -1 }`  

### `is.ios()`
Check if the user agent indicates that the device is iOS.

### `is.safari()`
Check if the user agent indicates that the device is Safari.

### `is.chrome()`
Check if the user agent indicates that the device is Chrome.

### `is.ie()`
Check if the user agent indicates that the device is Internet Explorer.

### `is.ie9()`
Check if the user agent indicates that the device is Internet Explorer 9.

### `is.ie10()`
Check if the user agent indicates that the device is Internet Explorer 10.

### `is.ie11()`
Check if the user agent indicates that the device is Internet Explorer 11.

### `is.edge()`
Check if the user agent indicates that the device is Microsoft Edge.
