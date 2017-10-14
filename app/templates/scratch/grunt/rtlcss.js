module.exports = {
	/**
	 * grunt-rtlcss
	 *
	 * grunt plugin for RTLCSS, a framework for transforming CSS from LTR to RTL.
	 *
	 * @link https://www.npmjs.com/package/grunt-rtlcss
	 */
	theme: {
		expand: true,
		cwd: '.',
		dest: '.',
		ext: '-rtl.css',
		src: [
			'assets/css/*.css'
		]
	}
};
