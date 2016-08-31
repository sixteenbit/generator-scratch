module.exports = {
	/**
	 * grunt-contrib-copy
	 *
	 * Copy files and folders
	 *
	 * @link https://www.npmjs.com/package/grunt-contrib-copy
	 */
	main: {
		expand: true,
		src: [
			'**',
			'!**/.*',
			'!**/readme.md',
      '!*.map',
      '!bower_components/**',
      '!dist/**',
      '!node_modules/**',
      '!assets/sass/**',
      '!assets/js/src/**',
      '!assets/img/src/**',
			'!assets/css/*.map',
			'!grunt/**',
			'!bower.json',
			'!Gruntfile.js',
			'!package.json'
		],
		dest: 'dist/<%%= package.name %>/'
	},
  foundation: {
    filter: 'isFile',
    src: 'bower_components/foundation-sites/scss/foundation.scss',
    dest: 'assets/sass/_foundation.scss'
  },
  foundation_variables: {
    filter: 'isFile',
    src: 'bower_components/foundation-sites/scss/settings/_settings.scss',
    dest: 'assets/sass/variables/_foundation.scss'
  }
};
