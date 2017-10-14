module.exports = {
	/**
	 * grunt-contrib-jshint
	 *
	 * Validate files with JSHint.
	 *
	 * @link https://www.npmjs.com/package/grunt-contrib-jshint
	 */
	options: {
		curly: true,
		eqeqeq: true,
		eqnull: true,
		browser: true,
		globals: {
			jQuery: true
		}
	},
	all: [
		'Gruntfile.js',
		'src/js/**/*.js',
		'!src/js/customizer.js',
		'!src/js/skip-link-focus.js'
	]
};
