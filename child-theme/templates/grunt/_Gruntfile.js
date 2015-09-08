module.exports = function(grunt) {

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
          <% if ( opts.sass ) { %>'bower_components/foundation/js/vendor/fastclick.js',
          'bower_components/foundation/js/vendor/placeholder.js',

          'bower_components/foundation/js/foundation/foundation.js',
          'bower_components/foundation/js/foundation/foundation.abide.js',
          'bower_components/foundation/js/foundation/foundation.accordion.js',
          'bower_components/foundation/js/foundation/foundation.alert.js',
          'bower_components/foundation/js/foundation/foundation.clearing.js',
          'bower_components/foundation/js/foundation/foundation.dropdown.js',
          'bower_components/foundation/js/foundation/foundation.equalizer.js',
          'bower_components/foundation/js/foundation/foundation.interchange.js',
          'bower_components/foundation/js/foundation/foundation.joyride.js',
          'bower_components/foundation/js/foundation/foundation.magellan.js',
          'bower_components/foundation/js/foundation/foundation.offcanvas.js',
          'bower_components/foundation/js/foundation/foundation.orbit.js',
          'bower_components/foundation/js/foundation/foundation.reveal.js',
          'bower_components/foundation/js/foundation/foundation.slider.js',
          'bower_components/foundation/js/foundation/foundation.tab.js',
          'bower_components/foundation/js/foundation/foundation.tooltip.js',
          'bower_components/foundation/js/foundation/foundation.topbar.js',<% } %>
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
          'assets/js/scripts.min.js': ['assets/js/scripts.js']
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
    <% if ( opts.sass ) { %>/**
     * grunt-sass
     *
     * Compile Sass to CSS using node-sass
     *
     * @link https://www.npmjs.com/package/grunt-sass
     */
    sass: {
      all: {
        options: {
          precision: 2,
          sourceMap: false,
          includePaths: [
            /**
             * Bourbon and Foundation are imported here so we can
             * access them from within the project
             */
            'bower_components/foundation/scss',
            'bower_components/bourbon/app/assets/stylesheets'
          ]
        },
        files: {
          'assets/css/main.css': 'assets/css/sass/main.scss'
        }
      }
    },<% } %>
    <% if ( opts.autoprefixer ) { %>/**
     * grunt-autoprefixer
     *
     * Parse CSS and add vendor-prefixed CSS properties using
     * the Can I Use database. Based on Autoprefixer.
     *
     * @link https://www.npmjs.com/package/grunt-autoprefixer
     */
    autoprefixer: {
      options: {
        map: false,
        browsers: [
          'last 2 versions',
          'ie 8',
          'ie 9',
          'android 2.3',
          'android 4',
          'opera 12'
        ]
      },
      dev: {
        src: 'assets/css/main.css'
      }
    },<% } %>
    /**
     * grunt-contrib-cssmin
     *
     * Minify CSS
     *
     * @link https://www.npmjs.com/package/grunt-contrib-cssmin
     */
    cssmin: {
      options: {
        banner: '/*! <%%= pkg.title %> - v<%%= pkg.version %>\n' +
          ' * <%%=pkg.homepage %>\n' +
          ' * Copyright (c) <%%= grunt.template.today("yyyy") %>;' +
          ' * Licensed GPLv2+' +
          ' */\n'
      },
      minify: {
        expand: true,
        cwd: 'assets/css/',
        src: ['main.css'],
        dest: 'assets/css/',
        ext: '.min.css'
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
      livereload: {
        files: ['assets/css/*.css'],
        options: {
          livereload: true
        }
      },
      styles: {
        <% if ( opts.sass ) { %>files: ['assets/css/sass/**/*.scss'],
        tasks: ['css'],<% } else if ( opts.autoprefixer ) { %>files: ['assets/css/src/*.css'],
        tasks: ['css'],<% } else { %>files: ['assets/css/*.css', '!assets/css/*.min.css'],
        tasks: ['css'],<% } %>
      },
      scripts: {
        files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
        tasks: ['js']
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
      main: ['release/<%%= pkg.version %>']
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
        dest: 'release/<%%= pkg.version %>/'
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
          archive: './release/<%%= pkg.name %>.<%%= pkg.version %>.zip'
        },
        expand: true,
        cwd: 'release/<%%= pkg.version %>/',
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
  <% if ( opts.sass ) { %>grunt.registerTask('css', ['sass', 'autoprefixer', 'cssmin', 'cssjanus', 'notify:css']);<% } else if ( opts.autoprefixer ) { %>grunt.registerTask('css', ['autoprefixer', 'cssmin', 'cssjanus', 'notify:css']);<% } else { %>grunt.registerTask('css', ['cssmin', 'cssjanus', 'notify:css']);<% } %>

  grunt.registerTask('js', ['jshint', 'concat', 'uglify', 'notify:js']);

  grunt.registerTask('default', ['css', 'js', 'notify:default']);

  grunt.registerTask('build', ['default', 'clean', 'copy:main', 'compress', 'notify:build']);

  grunt.util.linefeed = '\n';
};
