module.exports = {
	/**
	 * grunt-cssjanus
	 *
	 * Grunt plugin to convert CSS stylesheets between left-to-right
	 * and right-to-left.
	 *
	 * @link https://www.npmjs.com/package/grunt-cssjanus
	 */
	dev: {
		options: {
			swapLtrRtlInUrl: false
		},
		files: [{
			src: 'assets/css/main.css',
			dest: 'rtl.css'
		}]
	}
};
