# is [![Build Status](https://travis-ci.org/MethodGrab/is.svg?branch=master)](https://travis-ci.org/MethodGrab/is)
> Browser detection from a user agent string.


## Why
Feature detection is preferable but sometimes it's not enough to deal with device specific quirks.


## Install
```bash
npm install --save @methodgrab/is
```


## Usage

### Basic
```js
const is = require( '@methodgrab/is' );

is.ios();
// No UA specified, `navigator.userAgent` is used if possible
// → `true` on iOS devices, `false` elsewhere
```

### Custom User Agent
You can pass a custom user agent when initializing the library:

```js
const is = require( '@methodgrab/is' )( 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36' );

is.chrome();
// → always `true`

is.ios();
// → always `false`
```

Or at run time:

```js
const is = require( '@methodgrab/is' );

is.chrome( 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36' );
// → always `true`

is.ios( 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36' );
// → always `false`
```


## API

### `is.iosVersion()`
Get the `major`, `minor` & `patch` versions of iOS.  
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
