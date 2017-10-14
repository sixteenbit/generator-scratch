module.exports = {
	/**
	 * grunt-image
	 *
	 * Optimize PNG, JPEG, GIF, SVG images with grunt task.
	 *
	 * @link https://www.npmjs.com/package/grunt-image
	 */
	images: {
		files: [{
			expand: true,
			cwd: 'src/img/',
			src: ['**/*.{png,jpg,gif,svg}'],
			dest: 'assets/img/'
		}]
	}
};
