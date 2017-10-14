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

  scratch: function () {
    this.directory( 'scratch', this.fileSlug );
  },

  misc: function () {
    this.copy( 'misc/.editorconfig', this.fileSlug + '/.editorconfig' );
    this.copy( 'misc/.gitignore', this.fileSlug + '/.gitignore' );
    this.copy( 'misc/.sass-lint.yml', this.fileSlug + '/.sass-lint.yml' );
  },
} );

module.exports = ThemeGenerator;
