module.exports = {
	/**
	 * grunt-postcss
	 *
	 * Apply several post-processors to your CSS using PostCSS
	 *
	 * @link https://www.npmjs.com/package/grunt-postcss
	 */
	dev: {
		options: {
			// @todo need to figure out how to remove maps for build
			map: true,
			processors: [
				require( 'pixrem' )(),
				require( 'autoprefixer' )(
					{
						browsers: ['last 2 versions']
					}
				)
			]
		},
		src: ['assets/css/*.css']
	}
};
