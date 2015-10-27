module.exports = function (grunt) {

    /**
     * time-grunt
     *
     * Display the elapsed execution time of grunt tasks
     *
     * @link https://www.npmjs.com/package/time-grunt
     */
    require('time-grunt')(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * grunt-contrib-concat
         *
         * Concatenate files.
         *
         * Concatenates an array of js files set in /grunt/vars.js
         *
         * @link https://www.npmjs.com/package/grunt-contrib-concat
         */
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! <%%= pkg.title %> - v<%%= pkg.version %>\n' +
                ' * <%%= pkg.homepage %>\n' +
                ' * Copyright (c) <%%= grunt.template.today("yyyy") %>;' +
                ' * Licensed GPLv2+' +
                ' */\n'
            },
            main: {
                src: [
                    'assets/js/src/init.js'
                ],
                dest: 'assets/js/scripts.js'
            }
        },
        /**
         * grunt-contrib-jshint
         *
         * Validate files with JSHint.
         *
         * @link https://www.npmjs.com/package/grunt-contrib-jshint
         */
        jshint: {
            all: [
                'Gruntfile.js',
                'assets/js/src/**/*.js'
            ]
        },
        /**
         * grunt-contrib-uglify
         *
         * Minify files with UglifyJS.
         *
         * @link https://www.npmjs.com/package/grunt-contrib-uglify
         */
        uglify: {
            options: {
                banner: '/*! <%%= pkg.title %> - v<%%= pkg.version %>\n' +
                ' * <%%= pkg.homepage %>\n' +
                ' * Copyright (c) <%%= grunt.template.today("yyyy") %>;' +
                ' * Licensed GPLv2+' +
                ' */\n',
                mangle: {
                    except: ['jQuery']
                }
            },
            all: {
                files: {
                    'release/<%%= pkg.title %>/assets/js/scripts.js': ['release/<%%= pkg.title %>/assets/js/scripts.js'],
                    'release/<%= pkg.title %>/assets/js/vendor/modernizr.js': ['release/<%= pkg.title %>/assets/js/vendor/modernizr.js']
                }
            }
        },
        /**
         * grunt-modernizr
         *
         * Build out a lean, mean Modernizr machine.
         *
         * @link https://www.npmjs.com/package/grunt-modernizr
         */
        modernizr: {
            dist: {
                // Path to save out the built file
                dest: 'assets/js/vendor/modernizr.js',
                shiv: true,
                parseFiles: true,
                uglify: false,
                files: {
                    src: [
                        ['assets/js/scripts.js'],
                        ['assets/css/main.css']
                    ]
                }
            }
        },
        /**
         * grunt-contrib-sass
         *
         * Compile Sass to CSS
         *
         * @link https://www.npmjs.com/package/grunt-contrib-sass
         */
        sass: {
            dist: {
                options: {
                    loadPath: [
                        'bower_components/bourbon/app/assets/stylesheets'
                    ],
                    style: 'expanded'
                },
                files: {
                    'assets/css/main.css': 'assets/css/sass/main.scss',
                    'assets/css/editor-style.css': 'assets/css/sass/editor-style.scss'
                }
            }
        },
        /**
         * grunt-postcss
         *
         * Apply several post-processors to your CSS using PostCSS
         *
         * @link https://www.npmjs.com/package/grunt-postcss
         */
        postcss: {
            dev: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
                    ]
                },
                src: 'assets/css/*.css'
            },
            build: {
                options: {
                    map: true,
                    processors: [
                        require('cssnano')() // minify the result
                    ]
                },
                src: 'release/<%= pkg.name %>/assets/css/*.css'
            }
        },
        /**
         * grunt-cssjanus
         *
         * Grunt plugin to convert CSS stylesheets between left-to-right
         * and right-to-left.
         *
         * @link https://www.npmjs.com/package/grunt-cssjanus
         */
        cssjanus: {
            dev: {
                options: {
                    swapLtrRtlInUrl: false
                },
                files: [{
                    src: 'assets/css/main.css',
                    dest: 'rtl.css'
                }]
            }
        },
        /**
         * grunt-wp-i18n
         *
         * Internationalize WordPress themes and plugins.
         *
         * @link https://www.npmjs.com/package/grunt-wp-i18n
         */
        makepot: {
            prod: {
                options: {
                    domainPath: '/languages/',
                    potFilename: '<%%= pkg.name %>.pot',
                    type: 'wp-theme'
                }
            }
        },
        /**
         * grunt-contrib-watch
         *
         * Run predefined tasks whenever watched file patterns are
         * added, changed or deleted.
         *
         * @link https://www.npmjs.com/package/grunt-contrib-watch
         */
        watch: {
            styles: {
                files: ['assets/css/sass/**/*.scss'],
                tasks: ['css']
            },
            scripts: {
                files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
                tasks: ['js']
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
        },
        /**
         * grunt-browser-sync
         *
         * Live CSS reload & Browser Syncing
         *
         * @link https://www.npmjs.com/package/grunt-browser-sync
         */
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '*.php',
                        '**/*.php',
                        'Gruntfile.js',
                        'assets/js/*.js',
                        'assets/css/*.css'
                    ]
                },
                options: {
                    watchTask: true,
                    debugInfo: true,
                    logConnections: true,
                    notify: true,
                    proxy: 'local.wordpress.dev',
                    ghostMode: {
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }
            }
        },
        /**
         * grunt-contrib-clean
         *
         * Clean files and folders.
         *
         * @link https://www.npmjs.com/package/grunt-contrib-clean
         */
        clean: {
            main: ['release/<%%= pkg.name %>']
        },
        /**
         * grunt-contrib-copy
         *
         * Copy files and folders
         *
         * @link https://www.npmjs.com/package/grunt-contrib-copy
         */
        copy: {
            // Copy the theme to a versioned release directory
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
                    '!assets/js/src/**',
                    '!assets/img/src/**',
                    '!bower.json',
                    '!Gruntfile.js',
                    '!package.json'
                ],
                dest: 'release/<%%= pkg.name %>/'
            }
        },
        /**
         * grunt-contrib-compress
         *
         * Compress files and folders.
         *
         * Used in grunt package to create production-ready zip file.
         *
         * @link https://www.npmjs.com/package/grunt-contrib-compress
         */
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: './release/ <%%=pkg.name %>.<%%= pkg.version %>.zip'
                },
                expand: true,
                cwd: 'release/<%%= pkg.name %>/',
                src: ['**/*'],
                dest: '<%%= pkg.name %>/'
            }
        },
        /**
         * grunt-version
         *
         * Handle versioning of a project
         *
         * @link https://github.com/kswedberg/grunt-version
         */
        version: {
            packages: {
                src: ['package.json', 'bower.json']
            },
            php: {
                options: {
                    prefix: '\'<%= opts.funcPrefix.toUpperCase() %>_VERSION\', \''
                },
                src: ['functions.php']
            },
            style: {
                options: {
                    prefix: 'Version: '
                },
                src: ['style.css']
            }
        },
        /**
         * grunt-version-check
         *
         * Checks if your NPM or Bower dependencies are out of date.
         *
         * Run grunt versioncheck
         *
         * @link https://www.npmjs.com/package/grunt-version-check
         */
        versioncheck: {
            options: {
                skip: ['semver', 'npm', 'lodash'],
                hideUpToDate: false
            }
        },
        /**
         * grunt-notify
         *
         * Automatic desktop notifications for Grunt errors and warnings using
         * Growl for OS X or Windows, Mountain Lion and Mavericks Notification
         * Center, and Notify-Send.
         *
         * @link https://www.npmjs.com/package/grunt-notify
         */
        notify: {
            css: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'CSS is compiled.'
                }
            },
            js: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'JS is all good.'
                }
            },
            default: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'All tasks have completed with no errors.'
                }
            },
            minify: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'Assets have been minified.'
                }
            },
            build: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'Production files created.'
                }
            }
        }
    });
    /**
     * load-grunt-tasks
     *
     * Load multiple grunt tasks using globbing patterns
     *
     * This module will read the dependencies/devDependencies/peerDependencies
     * in your package.json and load grunt tasks that match the provided patterns.
     *
     * @link https://www.npmjs.com/package/load-grunt-tasks
     */
    require('load-grunt-tasks')(grunt);

    // Register tasks
    grunt.registerTask('sync', ['browserSync', 'watch']);

    grunt.registerTask('css', ['sass', 'postcss:dev', 'cssjanus', 'notify:css']);

    grunt.registerTask('js', ['jshint', 'concat', 'modernizr', 'notify:js']);

    grunt.registerTask('minify', ['postcss:build', 'uglify', 'notify:minify']);

    grunt.registerTask('default', ['css', 'js', 'makepot', 'notify:default']);

    grunt.registerTask('build', ['default', 'clean', 'copy:main', 'minify', 'compress', 'notify:build']);

    grunt.util.linefeed = '\n';
};
