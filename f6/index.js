'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var async = require('async');


var ThemeGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.log(chalk.magenta('Lets build a theme from Scratch! (with Foundation 6)'));

        this.on('end', function () {
            var i, length, installs = [],
                chalks = {
                    skipped: [],
                    run: []
                },
                installers = ['npm', 'bower'];

            this.log(chalk.green.bold('Your theme has been generated.'));

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

    options: function () {
        var done = this.async();
        this.basename = path.basename(this.env.cwd);

        var prompts = [{
            name: 'projectTitle',
            message: 'Theme name',
            default: 'Foundation Theme from Scratch'
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
        }];
        // gather initial settings
        this.prompt(prompts, function (props) {
            this.opts = props;
            this.opts.projectSlug = this.opts.projectTitle.toLowerCase().replace(/[\s]/g, '-').replace(/[^a-z-_]/g, '');
            this.fileSlug = this.opts.projectSlug;
            this.namespace = this.opts.projectTitle.replace(/[\s|-]/g, '_').replace(/( ^|_ )( [a-z] )/g, function (match, group1, group2) {
                return group1 + group2.toUpperCase();
            });
            done();
        }.bind(this));
    },

    theme: function () {
        this.template('theme/_header.php', 'header.php');
        this.template('theme/_functions.php', 'functions.php');
        this.template('theme/_walkers.php', 'inc/walkers.php');
        this.template('../../shared/theme/_index.php', 'index.php');
        this.template('../../shared/theme/_archive.php', 'archive.php');
        this.template('../../shared/theme/_page.php', 'page.php');
        this.template('../../shared/theme/_single.php', 'single.php');
        this.template('../../shared/theme/_search.php', 'search.php');
        this.template('../../shared/theme/_footer.php', 'footer.php');
        this.template('../../shared/theme/_sidebar.php', 'sidebar.php');
        this.template('../../shared/theme/_404.php', '404.php');
        this.template('../../shared/theme/_comments.php', 'comments.php');
        this.template('../../shared/theme/_content.php', 'template-parts/content.php');
        this.template('../../shared/theme/_content-single.php', 'template-parts/content-single.php');
        this.template('../../shared/theme/_content-page.php', 'template-parts/content-page.php');
        this.template('../../shared/theme/_content-search.php', 'template-parts/content-search.php');
        this.template('../../shared/theme/_content-none.php', 'template-parts/content-none.php');
        this.template('../../shared/theme/_core.php', 'inc/core.php');
        this.template('../../shared/theme/_extras.php', 'inc/extras.php');
        this.template('../../shared/theme/_template-tags.php', 'inc/template-tags.php');
        this.template('../../shared/theme/_jetpack.php', 'inc/jetpack.php');
        this.template('../../shared/theme/_custom-header.php', 'inc/custom-header.php');
        this.template('../../shared/theme/_back-combat.php', 'inc/back-combat.php');
        this.copy('../../shared/theme/screenshot.png', 'screenshot.png');
        this.copy('../../shared/theme/_readme.txt', 'readme.txt');
        this.copy('../../shared/theme/icon.png', 'icon.png');
        this.copy('../../shared/theme/_README.md', 'README.md');
        this.copy('../../shared/theme/readme-includes.md', 'inc/readme.md');
    },

    images: function () {
        this.copy('../../shared/images/readme.md', 'assets/img/readme.md');
        this.copy('../../shared/images/readme-sources.md', 'assets/img/src/readme.md');
    },

    js: function () {
        this.template('js/_init.js', 'assets/js/src/_init.js');
    },

    css: function () {
        this.directory('sass', 'assets/css/sass');
        this.template('../../shared/css/_style.css', 'style.css');
        this.copy('../../shared/css/readme.md', 'assets/css/readme.md');
    },

    grunt: function () {
        this.template('grunt/_package.json', 'package.json');
        this.template('grunt/_Gruntfile.js', 'Gruntfile.js');
        this.copy('../../shared/grunt/_jshintrc', '.jshintrc');
    },

    bower: function () {
        this.template('bower/_bower.json', 'bower.json');
        this.copy('../../shared/bower/bowerrc', '.bowerrc');
    },

    git: function () {
        this.copy('../../shared/git/gitignore', '.gitignore');
    }
});

function _install(command, context) {
    return function install(cb) {
        context.emit(command + 'Install');
        context.spawnCommand(command, ['install'])
            .on('error', cb)
            .on('exit', context.emit.bind(context, command + 'Install:end'))
            .on('exit', function (err) {
                if (err === 127) {
                    this.log.error('Could not find Composer');
                }
                cb(err);
            }.bind(context));
    }
}

module.exports = ThemeGenerator;
