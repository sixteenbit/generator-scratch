module.exports = {
	/**
	 * grunt-sass
	 *
	 * Compile Sass to CSS using node-sass
	 *
	 * @link https://www.npmjs.com/package/grunt-sass
	 */
	dist: {
		options: {
			sourceMap: true,
			// @link https://make.wordpress.org/core/handbook/best-practices/coding-standards/css/
			indentedSyntax: true,
			indentType: 'tab',
			indentWidth: '1',
			includePaths: [
				'node_modules/foundation-sites/scss'
			],
			outputStyle: 'expanded'
		},
		files: {
			'assets/css/editor-style.css': 'src/sass/editor-style.scss',
			'assets/css/main.css': 'src/sass/main.scss',
			'assets/css/font-awesome.css': 'node_modules/font-awesome/scss/font-awesome.scss',
			'assets/css/animate.css': 'node_modules/animate.css/animate.css'
		}
	}
};
