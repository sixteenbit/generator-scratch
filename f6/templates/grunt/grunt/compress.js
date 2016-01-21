module.exports = {
    /**
     * grunt-contrib-compress
     *
     * Compress files and folders.
     *
     * Used in grunt package to create production-ready zip file.
     *
     * @link https://www.npmjs.com/package/grunt-contrib-compress
     */
    main: {
        options: {
            mode: 'zip',
            archive: './release/<%%=package.name %>.<%%= package.version %>.zip'
        },
        expand: true,
        cwd: 'release/<%%= package.name %>/',
        src: ['**/*'],
        dest: '<%%= package.name %>/'
    }
};
