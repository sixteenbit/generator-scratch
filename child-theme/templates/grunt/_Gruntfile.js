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
     * grunt-contrib-sass
     *
     * Compile Sass to CSS
     *
     * @link https://www.npmjs.com/package/grunt-contrib-sass
     */
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'assets/css/main.css': 'assets/css/sass/main.scss'
        }
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
      default: {
        options: {
          title: 'Grunt, grunt!',
          message: 'All tasks have completed with no errors.'
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

  grunt.registerTask('css', ['sass', 'cssjanus', 'notify:css']);

  grunt.registerTask('default', ['css', 'makepot', 'notify:default']);

  grunt.registerTask('build', ['default', 'clean', 'copy:main', 'compress', 'notify:build']);

  grunt.util.linefeed = '\n';
};
