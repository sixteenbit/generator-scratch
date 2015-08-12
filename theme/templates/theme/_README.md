# <%= opts.projectTitle %>

## Development

Enable "Live Reload" under Advanced in the theme customizer to turn on livereload.js for development with grunt.

## Production

After running `grunt prod` enable "Use minified assets" to use production files.

### Install Grunt and Bower

**Unfamiliar with npm? Don't have node installed?** [Download and install node.js](http://nodejs.org/download/) before proceeding.

From the command line:

1. Install `grunt-cli` and `bower` globally with `npm install -g grunt-cli bower`.
2. Navigate to the theme directory, then run `npm install`. npm will look at `package.json` and automatically install the necessary dependencies. Also run `bower install`, which installs front-end packages defined in `bower.json`.

When completed, you'll be able to run the various Grunt commands provided from the command line.

### Available Grunt commands

* `grunt css` — Compile Sass to CSS and minifies
* `grunt js` — Compile all scripts and minifies
* `grunt watch` – Watches Sass, CSS, JS, and PHP file changes and reloads browser
* `grunt build` — Copies files to a distribution folder and creates a versioned zip
