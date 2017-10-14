module.exports = {
	'default': [
		'clean:assets',
		'copy:fontawesome',
		'styles',
		'scripts',
		'makepot',
		'notify:default'
	],
	'styles': [
		'sass',
		// @todo need to rework this
		'postcss',
		'rtlcss',
		'notify:styles'
	],
	'scripts': [
		'jshint',
		'concat',
		'notify:scripts'
	],
	'build': [
		'clean:dist',
		'default',
		'image',
		'copy:dist',
		'notify:build'
	],
	'server': [
		'browserSync',
		'watch'
	]
};
