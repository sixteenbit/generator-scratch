module.exports = {
    /**
     * grunt-contrib-uglify
     *
     * Minify files with UglifyJS.
     *
     * @link https://www.npmjs.com/package/grunt-contrib-uglify
     */
    options: {
        compress: {
            warnings: false
        },
        preserveComments: 'some',
        banner: '/*! <%%= package.title %> - v<%%= package.version %>\n' +
        ' * <%%= package.homepage %>\n' +
        ' * Copyright (c) <%%= grunt.template.today("yyyy") %>;' +
        ' * Licensed GPLv2+' +
        ' */\n',
        mangle: {
            except: ['jQuery']
        }
    },
    all: {
        files: {
            'assets/js/scripts.js': ['assets/js/scripts.js']
        }
    }
};