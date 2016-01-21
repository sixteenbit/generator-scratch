module.exports = {
    /**
     * grunt-contrib-imagemin
     *
     * Minify PNG, JPG, and GIF images.
     *
     * @link https://www.npmjs.com/package/grunt-contrib-imagemin
     */
    dynamic: {
        files: [{
            expand: true,
            cwd: 'assets/img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'assets/img/'
        }]
    }
};