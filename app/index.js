'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ScratchGenerator = yeoman.generators.Base.extend({
    notify: function () {
        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('Invoke a subgenerator to get started!'));
        this.log("Available Modules:");
        this.log(chalk.green("\tyo scratch:theme"));
        this.log(chalk.green("\tyo scratch:child-theme"));
        this.log(chalk.green("\tyo scratch:f5"));
        this.log(chalk.green("\tyo scratch:f6"));
    }
});

module.exports = ScratchGenerator;
