module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
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
    jshint: {
      all: [
        'Gruntfile.js',
        'assets/js/src/**/*.js',
        'assets/js/test/**/*.js'
      ]
    },
    uglify: {
      all: {
        files: {
          'assets/js/scripts.min.js': ['assets/js/scripts.js']
        },
        options: {
          banner: '/*! <%%= pkg.title %> - v<%%= pkg.version %>\n' +
            ' * <%%= pkg.homepage %>\n' +
            ' * Copyright (c) <%%= grunt.template.today("yyyy") %>;' +
            ' * Licensed GPLv2+' +
            ' */\n',
          mangle: {
            except: ['jQuery']
          }
        }
      },
      ie: {
        files: {
          'assets/js/ie.js': [
            'bower_components/respond/dest/respond.src.js',
            'bower_components/selectivizr/selectivizr.js'
          ]
        }
      }
    },
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
    makepot: {
      prod: {
        options: {
          domainPath: '/languages/',
          potFilename: '<%= opts.funcPrefix %>.pot',
          type: 'wp-theme'
        }
      }
    },
    modernizr: {
      dev: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: 'assets/js/vendor/modernizr.js',
        shiv: true,
        parseFiles: true,
        uglify: false,
        files: {
          src: [
            ['assets/js/scripts.js'],
            ['assets/css/main.css']
          ]
        }
      },
      prod: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: 'assets/js/vendor/modernizr.min.js',
        shiv: true,
        parseFiles: true,
        uglify: true,
        files: {
          src: [
            ['assets/js/scripts.min.js'],
            ['assets/css/main.min.css']
          ]
        }
      }
    },
    <% if ( opts.sass ) { %>
    sass: {
      all: {
        options: {
          precision: 2,
          sourceMap: true,
          includePaths: [
            'bower_components/foundation/scss',
            'bower_components/bourbon/app/assets/stylesheets'
          ]
        },
        files: {
          'assets/css/main.css': 'assets/css/sass/main.scss',
          'assets/css/font-awesome.css': ['bower_components/fontawesome/scss/font-awesome.scss'],
        }
      }
    },
    <% } %>
    <% if ( opts.autoprefixer ) { %>
    postcss: {
      dist: {
        options: {
          processors: [
            require('autoprefixer-core')({
              browsers: 'last 2 versions'
            })
          ]
        },
        files: {
          <% if ( opts.sass ) { %>
          'assets/css/main.css': ['assets/css/main.css']
          <% } else { %>
          'assets/css/main.css': ['assets/css/src/main.css']
          <% } %>
        }
      }
    },
    <% } %>
    pixrem: {
      options: {
        rootvalue: '16px',
        replace: true
      },
      dev: {
        src: ['assets/css/main.css'],
        dest: 'assets/css/ie.css'
      }
    },
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
    watch: {
      livereload: {
        files: ['assets/css/*.css'],
        options: {
          livereload: true
        }
      },
      styles: {
        <% if ( opts.sass ) { %>
        files: ['assets/css/sass/**/*.scss'],
          tasks: ['sass', 'autoprefixer', 'cssmin'], <% } else if ( opts.autoprefixer ) { %>
        files: ['assets/css/src/*.css'],
          tasks: ['autoprefixer', 'cssmin'], <% } else { %>
        files: ['assets/css/*.css', '!assets/css/*.min.css'],
          tasks: ['cssmin'], <% } %>
        options: {
          debounceDelay: 500
        }
      },
      scripts: {
        files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          debounceDelay: 500
        }
      }
    },
    clean: {
      main: ['release/<%%= pkg.version %>']
    },
    copy: {
      // Copy the theme to a versioned release directory
      main: {
        src: [
          '**',
          '!**/.*',
          '!**/readme.md',
          '!node_modules/**',
          '!vendor/**',
          '!tests/**',
          '!release/**',
          '!assets/css/sass/**',
          '!assets/css/src/**',
          '!assets/js/src/**',
          '!images/src/**',
          '!bootstrap.php',
          '!bower.json',
          '!composer.json',
          '!composer.lock',
          '!Gruntfile.js',
          '!package.json'
        ],
        dest: 'release/<%%= pkg.version %>/'
      }
    },
    compress: {
      main: {
        options: {
          mode: 'zip',
          archive: './release/<%= opts.funcPrefix %>.<%%= pkg.version %>.zip'
        },
        expand: true,
        cwd: 'release/<%%= pkg.version %>/',
        src: ['**/*'],
        dest: '<%= opts.funcPrefix %>/'
      }
    },
    versioncheck: {
      options: {
        skip: ['semver', 'npm', 'lodash'],
        hideUpToDate: false
      }
    }
  });

  // Load tasks
  require('load-grunt-tasks')(grunt);

  // Register tasks
  <% if ( opts.sass ) { %>
  grunt.registerTask('css', ['sass', 'pixrem', 'postcss', 'cssmin', 'cssjanus']);
  <% } else if ( opts.autoprefixer ) { %>
  grunt.registerTask('css', ['pixrem', 'postcss', 'cssmin', 'cssjanus']);
  <% } else { %>
  grunt.registerTask('css', ['pixrem', 'cssmin', 'cssjanus']);
  <% } %>

  grunt.registerTask('js', ['jshint', 'concat', 'uglify', 'modernizr']);

  grunt.registerTask('default', ['css', 'js', 'makepot']);

  grunt.registerTask('build', ['default', 'clean', 'copy', 'compress']);

  grunt.util.linefeed = '\n';
};
