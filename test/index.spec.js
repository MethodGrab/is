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
	iOS: {
		safari : 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_0 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A340 Safari/601.1', // iOS 9
	},
};


// [ ua, method, expected ]
const tests = [
	// Win
	[ uas.win.edge, 'iOS', false ],
	[ uas.win.edge, 'safari', false ],
	[ uas.win.edge, 'ie9', false ],
	[ uas.win.edge, 'ie10', false ],
	[ uas.win.edge, 'ie11', false ],
	[ uas.win.edge, 'edge', true ],

	[ uas.win.ie11, 'iOS', false ],
	[ uas.win.ie11, 'safari', false ],
	[ uas.win.ie11, 'ie9', false ],
	[ uas.win.ie11, 'ie10', false ],
	[ uas.win.ie11, 'ie11', true ],
	[ uas.win.ie11, 'edge', false ],

	[ uas.win.ie10, 'iOS', false ],
	[ uas.win.ie10, 'safari', false ],
	[ uas.win.ie10, 'ie9', false ],
	[ uas.win.ie10, 'ie10', true ],
	[ uas.win.ie10, 'ie11', false ],
	[ uas.win.ie10, 'edge', false ],

	[ uas.win.ie9, 'iOS', false ],
	[ uas.win.ie9, 'safari', false ],
	[ uas.win.ie9, 'ie9', true ],
	[ uas.win.ie9, 'ie10', false ],
	[ uas.win.ie9, 'ie11', false ],
	[ uas.win.ie9, 'edge', false ],

	// OS X
	[ uas.osx.chrome, 'iOS', false ],
	[ uas.osx.chrome, 'safari', false ],
	[ uas.osx.chrome, 'ie9', false ],
	[ uas.osx.chrome, 'ie10', false ],
	[ uas.osx.chrome, 'ie11', false ],
	[ uas.osx.chrome, 'edge', false ],

	[ uas.osx.firefox, 'iOS', false ],
	[ uas.osx.firefox, 'safari', false ],
	[ uas.osx.firefox, 'ie9', false ],
	[ uas.osx.firefox, 'ie10', false ],
	[ uas.osx.firefox, 'ie11', false ],
	[ uas.osx.firefox, 'edge', false ],

	[ uas.osx.safari, 'iOS', false ],
	[ uas.osx.safari, 'safari', true ],
	[ uas.osx.safari, 'ie9', false ],
	[ uas.osx.safari, 'ie10', false ],
	[ uas.osx.safari, 'ie11', false ],
	[ uas.osx.safari, 'edge', false ],

	// iOS
	[ uas.iOS.safari, 'iOS', true ],
	[ uas.iOS.safari, 'safari', true ],
	[ uas.iOS.safari, 'ie9', false ],
	[ uas.iOS.safari, 'ie10', false ],
	[ uas.iOS.safari, 'ie11', false ],
	[ uas.iOS.safari, 'edge', false ],
];


test( 'throws an error when no UA is available', t => {
	t.throws( () => {
		Lib();
	});

	t.pass();
});


test( 'matches userAgents correctly', t => {
	tests.forEach( ([ ua, method, expected ]) => {
		const lib = Lib( ua );
		t.is( lib[ method ](), expected, `"${ua}" ${expected ? 'should' : 'should not'} match "is.${method}()"` );
		t.pass();
	});
});
