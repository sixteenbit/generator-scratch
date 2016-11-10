module.exports = {
	'default': [
		'styles',
		'scripts',
		'makepot',
		'notify:default'
	],
	'styles': [
		'clean:pre',
		'sass',
		'postcss:dev',
		'rtlcss',
		'notify:styles'
	],
	'scripts': [
		'jshint',
		'concat',
		'notify:scripts'
	],
	'build': [
		'clean',
		'default',
		'postcss:build',
		'copy:main',
		'compress',
		'notify:build'
	],
	'server': [
		'browserSync',
		'watch'
	]
};
