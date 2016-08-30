module.exports = {
	/**
	 * grunt-contrib-uglify
	 *
	 * Minify files with UglifyJS.
	 *
	 * @link https://www.npmjs.com/package/grunt-contrib-uglify
	 */
	options: {
		banner: '/*! <%%= package.title %>\n' +
		' * <%%= package.homepage %>\n' +
		' * Copyright (c) <%%= grunt.template.today("yyyy") %>;\n' +
		' * Licensed GPLv2+\n' +
		' */\n',
		mangle: {
			except: ['jQuery']
		}
	},
	all: {
		files: {
			'assets/js/customizer.js': ['assets/js/customizer.js'],
			'assets/js/foundation.js': ['assets/js/foundation.js'],
			'assets/js/scripts.js': ['assets/js/scripts.js'],
			'assets/js/skip-link-focus.js': ['assets/js/skip-link-focus.js']
		}
	}
};
