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
		stripBanners: true,
		banner: '/*! <%%= package.title %>\n' +
		' * <%%= package.homepage %>\n' +
		' * Copyright (c) <%%= grunt.template.today("yyyy") %>;\n' +
		' * Licensed GPLv2+\n' +
		' */\n'
	},
	main: {
		src: [
			// Libraries required by Foundation
			'bower_components/motion-ui/dist/motion-ui.js',
			'bower_components/what-input/what-input.js',

			// Core Foundation files
			'bower_components/foundation-sites/js/foundation.core.js',
			'bower_components/foundation-sites/js/foundation.util.*.js',

			// Individual Foundation components
			// If you aren't using a component, just remove it from the list
			'bower_components/foundation-sites/js/foundation.abide.js',
			'bower_components/foundation-sites/js/foundation.accordion.js',
			'bower_components/foundation-sites/js/foundation.accordionMenu.js',
			'bower_components/foundation-sites/js/foundation.drilldown.js',
			'bower_components/foundation-sites/js/foundation.dropdown.js',
			'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
			'bower_components/foundation-sites/js/foundation.equalizer.js',
			'bower_components/foundation-sites/js/foundation.interchange.js',
			'bower_components/foundation-sites/js/foundation.magellan.js',
			'bower_components/foundation-sites/js/foundation.offcanvas.js',
			'bower_components/foundation-sites/js/foundation.orbit.js',
			'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
			'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
			'bower_components/foundation-sites/js/foundation.reveal.js',
			'bower_components/foundation-sites/js/foundation.slider.js',
			'bower_components/foundation-sites/js/foundation.sticky.js',
			'bower_components/foundation-sites/js/foundation.tabs.js',
			'bower_components/foundation-sites/js/foundation.toggler.js',
			'bower_components/foundation-sites/js/foundation.tooltip.js'
		],
		dest: 'assets/js/foundation.js'
	},
	scripts: {
		src: [
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
