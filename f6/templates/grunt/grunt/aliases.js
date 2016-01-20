module.exports = {
    'default': [
        'copy:fontawesome',
        'styles',
        'scripts',
        'makepot',
        'notify:default'
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
    'minify': [
        'postcss:build',
        'uglify',
        'notify:minify'
    ],
    'build': [
        'default',
        'minify',
        'imagemin',
        'notify:build'
    ],
    'release': [
        'build',
        'copy',
        'compress',
        'notify:release'
    ],
    'bs-watch': [
        'browserSync',
        'watch'
    ]
};
