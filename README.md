# is.js
UA detection.
Feature detection should be used where possible but sometimes it's not enough.


## Usage

### Basic
```js
var is = require( 'is' );

is.iOS() // `true` on iOS devices, `false` elsewhere
```

### Custom UA
You can pass a custom user agent when initializing the library:

```js
var is = require( 'is' )( 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36' );
is.iOS(); // always `false`
```


## Common Uses

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
if ( is.iOS() && is.getIosVersion().major < 8 ) {
	// either use fallback CSS
	$( 'html' ).addClass( 'no-vhunits' );

	// or use JS to calculate the min-height
	iosVhFix();
	$( window ).bind( 'resize', iosVhFix );
}
```


## API

### `is.iOS`
Checks to see if the current device is running iOS.

### `is.getIosVersion`
Returns the major & minor versions of iOS.

### `is.safari`
Checks to see if the current device is running Safari.

### `is.chrome`
Checks to see if the current device is running Chrome.

### `is.ie9`
Checks to see if the current device is running Internet Explorer 9.

### `is.ie10`
Checks to see if the current device is running Internet Explorer 10.

### `is.ie11`
Checks to see if the current device is running Internet Explorer 11.

### `is.edge`
Checks to see if the current device is running Microsoft Edge.
