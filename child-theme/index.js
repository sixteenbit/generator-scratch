'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var async = require('async');


var ChildThemeGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.log(chalk.magenta('Lets make a child theme from Scratch!'));

    this.on('end', function() {
      var i, length, installs = [],
        chalks = {
          skipped: [],
          run: []
        },
        installers = ['npm', 'bower'];

      this.log(chalk.green.bold('Your child-theme has been generated.'));

      for (i = 0, length = installers.length; i < length; i++) {
        if (this.options['skip-install'] || this.options['skip-' + installers[i]]) {
          chalks.skipped.push(chalk.yellow.bold(installers[i] + ' install'));
        } else {
          chalks.run.push(chalk.yellow.bold(installers[i] + ' install'));
          installs.push(_install(installers[i], this));
        }
      }

      if (0 < chalks.skipped.length) {
        this.log('Skipping ' + chalks.skipped.join(', ') + '. Just run yourself when you are ready.');
      }
      if (0 < installs.length) {
        this.log('Running ' + chalks.run.join(', ') + ' for you. If this fails try running yourself.');
        async.parallel(installs);
      }
    });
  },

  options: function() {
    var done = this.async();
    this.basename = path.basename(this.env.cwd);

    var prompts = [{
      name: 'parentSlug',
      message: 'Parent Theme Slug',
    }, {
      name: 'projectTitle',
      message: 'Theme name',
      default: 'Scratch Child'
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
      default: 'https://github.com/mrdink/generator-scratch'
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
    }, {
      type: 'confirm',
      name: 'sass',
      message: 'Use Foundation? (Sass Framework)',
      default: true
    }];
    // gather initial settings
    this.prompt(prompts, function(props) {
      this.opts = props;
      this.opts.projectSlug = this.opts.projectTitle.toLowerCase().replace(/[\s]/g, '-').replace(/[^a-z-_]/g, '');
      this.fileSlug = this.opts.projectSlug;
      this.namespace = this.opts.projectTitle.replace(/[\s|-]/g, '_').replace(/( ^|_ )( [a-z] )/g, function(match, group1, group2) {
        return group1 + group2.toUpperCase();
      });
      done();
    }.bind(this));
  },

  autoprefixer: function() {
    // If we're running Sass, automatically use autoprefixer.
    if (this.opts.sass) {
      this.opts.autoprefixer = true;
      return;
    }

    // See if we want to use it on it's own, but only if not using Sass.
    var done = this.async();
    this.prompt([{
        type: 'confirm',
        name: 'autoprefixer',
        message: 'Use Autoprefixer?',
        default: true
      }],
      function(props) {
        this.opts.autoprefixer = props.autoprefixer;
        done();
      }.bind(this));
  },

  theme: function() {
    this.copy('theme/_style.css', 'style.css');
    this.copy('../../shared/theme/screenshot.png', 'screenshot.png');
    this.copy('../../shared/theme/editorconfig', '.editorconfig');
    this.copy('../../shared/theme/csscomb.json', '.csscomb.json');
    this.copy('../../shared/theme/readme-includes.md', 'inc/readme.md');
  },

  images: function() {
    this.copy('../../shared/images/readme.md', 'assets/img/readme.md');
    this.copy('../../shared/images/readme-sources.md', 'assets/img/src/readme.md');
  },

  js: function() {
    this.template('../../shared/js/_init.js', 'assets/js/src/init.js');
    this.copy('../../shared/js/readme-vendor.md', 'assets/js/vendor/readme.md');
  },

  css: function() {
    if (this.opts.sass) {
      this.directory('sass', 'assets/css/sass');
    } else if (this.opts.autoprefixer) {
      this.template('../../shared/css/_main.css', 'assets/css/src/main.css');
    } else {
      this.template('../../shared/css/_main.css', 'assets/css/main.css');
    }
    this.copy('../../shared/css/readme.md', 'assets/css/readme.md');
  },

  grunt: function() {
    this.template('grunt/_package.json', 'package.json');
    this.template('grunt/_Gruntfile.js', 'Gruntfile.js');
    this.copy('../../shared/grunt/_jshintrc', '.jshintrc');
  },

  bower: function() {
    this.template('bower/_bower.json', 'bower.json');
    this.copy('../../shared/bower/bowerrc', '.bowerrc');
  },

  git: function() {
    this.copy('../../shared/git/gitignore', '.gitignore');
  }
});

function _install(command, context) {
  return function install(cb) {
    context.emit(command + 'Install');
    context.spawnCommand(command, ['install'])
      .on('error', cb)
      .on('exit', context.emit.bind(context, command + 'Install:end'))
      .on('exit', function(err) {
        if (err === 127) {
          this.log.error('Could not find Composer');
        }
        cb(err);
      }.bind(context));
  }
}

module.exports = ChildThemeGenerator;
