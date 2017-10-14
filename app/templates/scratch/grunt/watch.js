module.exports = {
	/**
	 * grunt-contrib-watch
	 *
	 * Run predefined tasks whenever watched file patterns are
	 * added, changed or deleted.
	 *
	 * @link https://www.npmjs.com/package/grunt-contrib-watch
	 */
	images: {
		files: ['src/img/**'],
		tasks: ['image']
	},
	styles: {
		files: ['src/sass/**/*.scss'],
		tasks: ['clean:css', 'styles']
	},
	scripts: {
		files: ['src/js/**/*.js'],
		tasks: ['scripts']
	},
	browserSync: {
		files: [
			'*.php',
			'**/*.php',
			'Gruntfile.js',
			'assets/js/*.js',
			'assets/css/*.css'
		],
		options: {
			watchTask: true
		}
	}
};
