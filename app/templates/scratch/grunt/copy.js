module.exports = {
	/**
	 * grunt-contrib-copy
	 *
	 * Copy files and folders
	 *
	 * @link https://www.npmjs.com/package/grunt-contrib-copy
	 */
	dist: {
		expand: true,
		src: [
			'**',
			'!**/.*',
			'!**/readme.md',
			'!*.map',
			'!node_modules/**',
			'!dist/**',
			'!vendor/**',
			'!node_modules/**',
			'!src/**',
			'!grunt/**',
			'!bower.json',
			'!Gruntfile.js',
			'!composer.json',
			'!composer.lock',
			'!phpcs.ruleset.xml',
			'!README.md',
			'!package.json',
			'!package-lock.json'
		],
		dest: 'dist/<%%= package.name %>/'
	},
	fontawesome: {
		expand: true,
		flatten: true,
		filter: 'isFile',
		src: ['node_modules/font-awesome/fonts/**'],
		dest: 'assets/fonts/'
	}
};
