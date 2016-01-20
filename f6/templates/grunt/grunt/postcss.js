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
            map: true,
            processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({
                    browsers: [
                        'Android 2.3',
                        'Android >= 4',
                        'Chrome >= 35',
                        'Firefox >= 31',
                        'Explorer >= 9',
                        'iOS >= 7',
                        'Opera >= 12',
                        'Safari >= 7.1'
                    ]
                }) // add vendor prefixes
            ]
        },
        src: 'assets/css/*.css'
    },
    build: {
        options: {
            map: false,
            processors: [
                require('cssnano')() // minify the result
            ]
        },
        src: 'assets/css/*.css'
    }
};