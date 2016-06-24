import test from 'ava';
import Lib  from '..';


const uas = {
	win: {
		edge : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240', // Win 10
		ie11 : 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
		ie10 : 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)',
		ie9  : 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
		ie8  : 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)',
	},
	osx: {
		chrome  : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
		firefox : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0',
		safari  : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12',
	},
	ios: {
		safari    : 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_0 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A340 Safari/601.1', // iOS 9
		safari704 : 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53', // iOS 7.0.4
	},
};


// [ ua, method, expected ]
const tests = [
	// Win
	[ uas.win.edge, 'ios', false ],
	[ uas.win.edge, 'safari', false ],
	[ uas.win.edge, 'ie', false ],
	[ uas.win.edge, 'ie9', false ],
	[ uas.win.edge, 'ie10', false ],
	[ uas.win.edge, 'ie11', false ],
	[ uas.win.edge, 'edge', true ],

	[ uas.win.ie11, 'ios', false ],
	[ uas.win.ie11, 'safari', false ],
	[ uas.win.ie11, 'ie', true ],
	[ uas.win.ie11, 'ie9', false ],
	[ uas.win.ie11, 'ie10', false ],
	[ uas.win.ie11, 'ie11', true ],
	[ uas.win.ie11, 'edge', false ],

	[ uas.win.ie10, 'ios', false ],
	[ uas.win.ie10, 'safari', false ],
	[ uas.win.ie10, 'ie', true ],
	[ uas.win.ie10, 'ie9', false ],
	[ uas.win.ie10, 'ie10', true ],
	[ uas.win.ie10, 'ie11', false ],
	[ uas.win.ie10, 'edge', false ],

	[ uas.win.ie9, 'ios', false ],
	[ uas.win.ie9, 'safari', false ],
	[ uas.win.ie9, 'ie', true ],
	[ uas.win.ie9, 'ie9', true ],
	[ uas.win.ie9, 'ie10', false ],
	[ uas.win.ie9, 'ie11', false ],
	[ uas.win.ie9, 'edge', false ],

	// OS X
	[ uas.osx.chrome, 'ios', false ],
	[ uas.osx.chrome, 'safari', false ],
	[ uas.osx.chrome, 'ie', false ],
	[ uas.osx.chrome, 'ie9', false ],
	[ uas.osx.chrome, 'ie10', false ],
	[ uas.osx.chrome, 'ie11', false ],
	[ uas.osx.chrome, 'edge', false ],

	[ uas.osx.firefox, 'ios', false ],
	[ uas.osx.firefox, 'safari', false ],
	[ uas.osx.firefox, 'ie', false ],
	[ uas.osx.firefox, 'ie9', false ],
	[ uas.osx.firefox, 'ie10', false ],
	[ uas.osx.firefox, 'ie11', false ],
	[ uas.osx.firefox, 'edge', false ],

	[ uas.osx.safari, 'ios', false ],
	[ uas.osx.safari, 'safari', true ],
	[ uas.osx.safari, 'ie', false ],
	[ uas.osx.safari, 'ie9', false ],
	[ uas.osx.safari, 'ie10', false ],
	[ uas.osx.safari, 'ie11', false ],
	[ uas.osx.safari, 'edge', false ],

	// iOS
	[ uas.ios.safari, 'ios', true ],
	[ uas.ios.safari, 'safari', true ],
	[ uas.ios.safari, 'ie', false ],
	[ uas.ios.safari, 'ie9', false ],
	[ uas.ios.safari, 'ie10', false ],
	[ uas.ios.safari, 'ie11', false ],
	[ uas.ios.safari, 'edge', false ],
];


const iOSVersionTests = [
	[ uas.ios.safari, { major: 9, minor: 0, patch: -1 } ],
	[ uas.ios.safari704, { major: 7, minor: 0, patch: 4 } ]
];


test( 'throws an error when there is no userAgent', t => {
	t.throws( () => {
		const lib = Lib();
		lib.chrome();
	});

	t.pass();
});


test( 'accepts a userAgent to the constructor', t => {
	let lib;

	t.notThrows( () => {
		lib = Lib( uas.osx.chrome );
	});

	t.is( lib.chrome(), true );

	t.pass();
});


test( 'accepts a userAgent at run time', t => {
	let lib;

	t.notThrows( () => {
		lib = Lib;
	});

	t.is( lib.chrome( uas.osx.chrome ), true );
	t.is( lib.safari( uas.osx.safari ), true );
	t.is( lib.ie( uas.win.ie11 ), true );

	t.pass();
});


test( 'matches userAgents correctly', t => {
	tests.forEach( ([ ua, method, expected ]) => {
		const lib = Lib( ua );
		t.is( lib[ method ](), expected, `"${ua}" ${expected ? 'should' : 'should not'} match "is.${method}()"` );
		t.pass();
	});
});


test( 'matches iOS versions correctly', t => {
	iOSVersionTests.forEach( ([ ua, expected ]) => {
		const lib = Lib( ua );
		t.deepEqual( lib.iosVersion(), expected, `"${ua}" ${expected ? 'should' : 'should not'} match "${JSON.stringify( expected )}"` );
		t.pass();
	});
});
