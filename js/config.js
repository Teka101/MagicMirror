magicMirror.config = function() {

	/** Language setting. */
	var lang = window.navigator.language;
	/*
	 * You can change the language, e.g. as:
	 * <pre>
	 * var lang = 'en';
	 * </pre>
	 */

	return {
		'lang':	lang,
		'weatherParams': {
		    'q':		'Paris,France',
		    'units':	'metric',
		    'lang':		lang
		},
		/*'compliments': [
            'Hey, handsome!',
            'Hi, sexy!',
            'Hello, beauty!',
            'You look sexy!',
            'Wow, you look hot!',
            'Looking good today!',
            'You look nice!',
            'Enjoy your day!'
		]*/
	};

}();

