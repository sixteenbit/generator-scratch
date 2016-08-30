'use strict';
var util = require( 'util' );
var path = require( 'path' );
var yeoman = require( 'yeoman-generator' );
var chalk = require( 'chalk' );
var async = require( 'async' );


var ThemeGenerator = yeoman.generators.Base.extend( {
  init: function () {
    this.log( chalk.magenta( 'Lets build a theme from Scratch.' ) );

    this.on( 'end', function () {
      var i, length, installs = [],
        chalks = {
          skipped: [],
          run: []
        },
        installers = ['npm', 'bower'];

      this.log( chalk.green.bold( 'Your theme has been generated.' ) );

      for ( i = 0, length = installers.length; i < length; i ++ ) {
        if ( this.options['skip-install'] || this.options['skip-' + installers[i]] ) {
          chalks.skipped.push( chalk.yellow.bold( installers[i] + ' install' ) );
        } else {
          chalks.run.push( chalk.yellow.bold( installers[i] + ' install' ) );
          installs.push( _install( installers[i], this ) );
        }
      }

      if ( 0 < chalks.skipped.length ) {
        this.log( 'Skipping ' + chalks.skipped.join( ', ' ) + '. Just run yourself when you are ready.' );
      }
      if ( 0 < installs.length ) {
        this.log( 'Running ' + chalks.run.join( ', ' ) + ' for you. If this fails try running yourself.' );
        async.parallel( installs );
      }
    } );
  },

  options: function () {
    var done = this.async();
    this.basename = path.basename( this.env.cwd );

    var prompts = [{
      name: 'projectTitle',
      message: 'Theme name',
      default: 'Scratch'
    }, {
      name: 'funcPrefix',
      message: 'PHP function prefix ( lowercase letters and underscores only )',
      default: 'scratch'
    }, {
      name: 'description',
      message: 'Description',
      default: 'The best WordPress theme ever made!'
    }, {
      name: 'projectHome',
      message: 'Theme homepage',
      default: 'https://github.com/sixteenbit/generator-scratch'
    }, {
      name: 'authorName',
      message: 'Author name',
      default: this.user.git.name
    }, {
      name: 'authorEmail',
      message: 'Author email',
      default: this.user.git.email
    }, {
      name: 'authorUrl',
      message: 'Author URL'
    }];
    // gather initial settings
    this.prompt( prompts, function ( props ) {
      this.opts = props;
      this.opts.projectSlug = this.opts.projectTitle.toLowerCase().replace( /[\s]/g, '-' ).replace( /[^a-z-_]/g, '' );
      this.fileSlug = this.opts.projectSlug;
      this.namespace = this.opts.projectTitle.replace( /[\s|-]/g, '_' ).replace( /( ^|_ )( [a-z] )/g, function ( match, group1, group2 ) {
        return group1 + group2.toUpperCase();
      } );
      done();
    }.bind( this ) );
  },

  theme: function () {
    this.template( 'theme/components/header/site-branding.php', 'components/header/site-branding.php' );
    this.template( 'theme/components/navigation/main-navigation.php', 'components/navigation/main-navigation.php' );
    this.template( 'theme/components/navigation/title-bar.php', 'components/navigation/title-bar.php' );
    this.template( 'theme/components/post/content.php', 'components/post/content.php' );
    this.template( 'theme/components/post/content-none.php', 'components/post/content-none.php' );
    this.template( 'theme/components/post/content-search.php', 'components/post/content-search.php' );
    this.template( 'theme/components/page/content-page.php', 'components/page/content-page.php' );
    this.template( 'theme/inc/custom-header.php', 'inc/custom-header.php' );
    this.template( 'theme/inc/customizer.php', 'inc/customizer.php' );
    this.template( 'theme/inc/extras.php', 'inc/extras.php' );
    this.template( 'theme/inc/jetpack.php', 'inc/jetpack.php' );
    this.template( 'theme/inc/template-tags.php', 'inc/template-tags.php' );
    this.template( 'theme/inc/walkers.php', 'inc/walkers.php' );
    this.template( 'theme/404.php', '404.php' );
    this.template( 'theme/archive.php', 'archive.php' );
    this.template( 'theme/comments.php', 'comments.php' );
    this.template( 'theme/footer.php', 'footer.php' );
    this.template( 'theme/functions.php', 'functions.php' );
    this.template( 'theme/header.php', 'header.php' );
    this.template( 'theme/index.php', 'index.php' );
    this.template( 'theme/page.php', 'page.php' );
    this.template( 'theme/search.php', 'search.php' );
    this.template( 'theme/sidebar.php', 'sidebar.php' );
    this.template( 'theme/single.php', 'single.php' );
    this.copy( 'theme/.editorconfig', '.editorconfig' );
    this.copy( 'theme/.scss-lint.yml', '.scss-lint.yml' );
    this.copy( 'theme/icon.png', 'icon.png' );
    this.copy( 'theme/README.md', 'README.md' );
    this.copy( 'theme/readme.txt', 'readme.txt' );
    this.copy( 'theme/readme-includes.md', 'inc/readme.md' );
    this.copy( 'theme/screenshot.png', 'screenshot.png' );
  },

  img: function () {
    this.copy( 'img/readme.md', 'assets/img/readme.md' );
    this.copy( 'img/readme-sources.md', 'assets/img/src/readme.md' );
  },

  js: function () {
    this.template( 'js/_theme.js', 'assets/js/src/_theme.js' );
    this.template( 'js/customizer.js', 'assets/js/src/customizer.js' );
    this.template( 'js/skip-link-focus-fix.js', 'assets/js/src/skip-link-focus-fix.js' );
  },

  css: function () {
    this.directory( 'sass', 'assets/sass' );
    this.template( 'css/style.css', 'style.css' );
    this.copy( 'css/readme.md', 'assets/css/readme.md' );
  },

  grunt: function () {
    this.directory( 'grunt/grunt', 'grunt' );
    this.template( 'grunt/package.json', 'package.json' );
    this.template( 'grunt/Gruntfile.js', 'Gruntfile.js' );
  },

  bower: function () {
    this.template( 'bower/bower.json', 'bower.json' );
    this.copy( 'bower/.bowerrc', '.bowerrc' );
  },

  git: function () {
    this.copy( 'git/.gitignore', '.gitignore' );
  }
} );

function _install ( command, context ) {
  return function install ( cb ) {
    context.emit( command + 'Install' );
    context.spawnCommand( command, ['install'] )
      .on( 'error', cb )
      .on( 'exit', context.emit.bind( context, command + 'Install:end' ) )
      .on( 'exit', function ( err ) {
        if ( err === 127 ) {
          this.log.error( 'Could not find Composer' );
        }
        cb( err );
      }.bind( context ) );
  }
}

module.exports = ThemeGenerator;
