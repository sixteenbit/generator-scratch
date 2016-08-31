module.exports = {
	'default': [
		'styles',
		'scripts',
		'makepot',
		'notify:default'
	],
  'setup': [
    'copy:foundation',
    'copy:foundation_variables'
  ],
	'styles': [
		'sass',
		'postcss:dev',
		'cssjanus',
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
