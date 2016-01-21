module.exports = {
    /**
     * grunt-sass
     *
     * Compile Sass to CSS using node-sass
     *
     * @link https://www.npmjs.com/package/grunt-sass
     */
    dist: {
        options: {
            sourceMap: true,
            includePaths: [
                'bower_components/foundation-sites/scss',
                'bower_components/motion-ui'
            ],
            outputStyle: 'expanded'
        },
        files: {
            'assets/css/app.css': 'assets/css/sass/app.scss',
            'assets/css/editor-style.css': 'assets/css/sass/editor-style.scss',
            'assets/css/font-awesome.css': 'bower_components/font-awesome/scss/font-awesome.scss'
        }
    }
};