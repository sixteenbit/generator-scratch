module.exports = {
	/**
	 * grunt-contrib-concat
	 *
	 * Concatenate files.
	 *
	 * Concatenates an array of js files set in /grunt/vars.js
	 *
	 * @link https://www.npmjs.com/package/grunt-contrib-concat
	 */
	options: {
		// separator: ';',
		stripBanners: true,
		banner: '/*! <%%= package.title %>\n' +
		' * <%%= package.homepage %>\n' +
		' * Copyright (c) <%%= grunt.template.today("yyyy") %>;\n' +
		' * Licensed GPLv2+\n' +
		' */\n'
	},
	main: {
		src: [
			'bower_components/foundation-sites/dist/foundation.js'
		],
		dest: 'assets/js/foundation.js'
	},
	scripts: {
		src: [
			'bower_components/motion-ui/dist/motion-ui.js',
			'bower_components/what-input/what-input.js',
			'assets/js/src/_*.js'
		],
		dest: 'assets/js/scripts.js'
	},
	customizer: {
		src: [
			'assets/js/src/customizer.js'
		],
		dest: 'assets/js/customizer.js'
	},
	skip: {
		src: [
			'assets/js/src/skip-link-focus-fix.js'
		],
		dest: 'assets/js/skip-link-focus-fix.js'
	}
};
