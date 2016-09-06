'use strict';
var util = require( 'util' );
var path = require( 'path' );
var yeoman = require( 'yeoman-generator' );
var chalk = require( 'chalk' );
var async = require( 'async' );


var ThemeGenerator = yeoman.generators.Base.extend( {
  init: function () {
    this.log( chalk.magenta( 'Lets build a theme from Scratch!' ) );

    this.on( 'end', function () {
      this.log( chalk.green.bold( 'Your new theme has been generated.' ) );
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
      done();
    }.bind( this ) );
  },

  theme: function () {
    this.template( 'theme/components/header/site-branding.php', this.fileSlug + '/components/header/site-branding.php' );
    this.template( 'theme/components/navigation/main-navigation.php', this.fileSlug + '/components/navigation/main-navigation.php' );
    this.template( 'theme/components/navigation/title-bar.php', this.fileSlug + '/components/navigation/title-bar.php' );
    this.template( 'theme/components/post/content.php', this.fileSlug + '/components/post/content.php' );
    this.template( 'theme/components/post/content-none.php', this.fileSlug + '/components/post/content-none.php' );
    this.template( 'theme/components/post/content-search.php', this.fileSlug + '/components/post/content-search.php' );
    this.template( 'theme/components/page/content-page.php', this.fileSlug + '/components/page/content-page.php' );
    this.template( 'theme/inc/custom-header.php', this.fileSlug + '/inc/custom-header.php' );
    this.template( 'theme/inc/customizer.php', this.fileSlug + '/inc/customizer.php' );
    this.template( 'theme/inc/extras.php', this.fileSlug + '/inc/extras.php' );
    this.template( 'theme/inc/jetpack.php', this.fileSlug + '/inc/jetpack.php' );
    this.template( 'theme/inc/template-tags.php', this.fileSlug + '/inc/template-tags.php' );
    this.template( 'theme/inc/walkers.php', this.fileSlug + '/inc/walkers.php' );
    this.template( 'theme/404.php', this.fileSlug + '/404.php' );
    this.template( 'theme/archive.php', this.fileSlug + '/archive.php' );
    this.template( 'theme/comments.php', this.fileSlug + '/comments.php' );
    this.template( 'theme/footer.php', this.fileSlug + '/footer.php' );
    this.template( 'theme/functions.php', this.fileSlug + '/functions.php' );
    this.template( 'theme/header.php', this.fileSlug + '/header.php' );
    this.template( 'theme/index.php', this.fileSlug + '/index.php' );
    this.template( 'theme/page.php', this.fileSlug + '/page.php' );
    this.template( 'theme/search.php', this.fileSlug + '/search.php' );
    this.template( 'theme/sidebar.php', this.fileSlug + '/sidebar.php' );
    this.template( 'theme/single.php', this.fileSlug + '/single.php' );
    this.copy( 'theme/_editorconfig', this.fileSlug + '/.editorconfig' );
    this.copy( 'theme/_scss-lint.yml', this.fileSlug + '/.scss-lint.yml' );
    this.copy( 'theme/README.md', this.fileSlug + '/README.md' );
    this.copy( 'theme/readme.txt', this.fileSlug + '/readme.txt' );
    this.copy( 'theme/readme-includes.md', this.fileSlug + '/inc/readme.md' );
    this.copy( 'theme/screenshot.png', this.fileSlug + '/screenshot.png' );
  },

  img: function () {
    this.copy( 'img/readme.md', this.fileSlug + '/assets/img/readme.md' );
    this.copy( 'img/readme-sources.md', this.fileSlug + '/assets/img/src/readme.md' );
  },

  js: function () {
    this.template( 'js/_theme.js', this.fileSlug + '/assets/js/src/_theme.js' );
    this.template( 'js/customizer.js', this.fileSlug + '/assets/js/src/customizer.js' );
    this.template( 'js/skip-link-focus-fix.js', this.fileSlug + '/assets/js/src/skip-link-focus-fix.js' );
  },

  css: function () {
    this.directory( 'sass', this.fileSlug + '/assets/sass' );
    this.template( 'css/style.css', this.fileSlug + '/style.css' );
    this.copy( 'css/readme.md', this.fileSlug + '/assets/css/readme.md' );
  },

  grunt: function () {
    this.directory( 'grunt/grunt', this.fileSlug + '/grunt' );
    this.template( 'grunt/package.json', this.fileSlug + '/package.json' );
    this.template( 'grunt/Gruntfile.js', this.fileSlug + '/Gruntfile.js' );
  },

  bower: function () {
    this.template( 'bower/bower.json', this.fileSlug + '/bower.json' );
    this.copy( 'bower/_bowerrc', this.fileSlug + '/.bowerrc' );
  },

  git: function () {
    this.copy( 'git/_gitignore', this.fileSlug + '/.gitignore' );
  }
} );

module.exports = ThemeGenerator;
