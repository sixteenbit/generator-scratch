module.exports = {
    /**
     * grunt-contrib-watch
     *
     * Run predefined tasks whenever watched file patterns are
     * added, changed or deleted.
     *
     * @link https://www.npmjs.com/package/grunt-contrib-watch
     */
    styles: {
        files: ['assets/css/sass/**/*.scss'],
        tasks: ['styles']
    },
    scripts: {
        files: ['assets/js/src/**/*.js'],
        tasks: ['scripts']
    },
    browserSync: {
        files: [
            '*.php',
            '**/*.php',
            'Gruntfile.js',
            'assets/js/*.js',
            'assets/css/*.css'
        ],
        options: {
            watchTask: true
        }
    }
};