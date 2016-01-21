module.exports = {
    /**
     * grunt-contrib-copy
     *
     * Copy files and folders
     *
     * @link https://www.npmjs.com/package/grunt-contrib-copy
     */
    main: {
        expand: true,
        src: [
            '**',
            '!**/.*',
            '!**/readme.md',
            '!node_modules/**',
            '!bower_components/**',
            '!vendor/**',
            '!release/**',
            '!assets/css/sass/**',
            '!assets/css/src/**',
            '!assets/css/*.map',
            '!assets/js/src/**',
            '!assets/img/src/**',
            '!grunt/**',
            '!bower.json',
            '!Gruntfile.js',
            '!package.json'
        ],
        dest: 'release/<%%= package.name %>/'
    },
    fontawesome: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: ['bower_components/font-awesome/fonts/**'],
        dest: 'assets/fonts/'
    }
};
