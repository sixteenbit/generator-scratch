# <%= opts.projectTitle %>

### What you'll need

**[Node.js](https://nodejs.org/)**

> My preferred method of installing node is through [Homebrew](http://brew.sh/). This allows you to install with the correct permissions.

```
$ brew cask install npm
```

**[Bower](http://bower.io/)**

```
$ npm install -g bower
```

#### Core commands

Compile Sass to CSS
```
$ grunt css
```

Concatenate scripts
```
$ grunt js
```

Reload browser upon file changes
```
$ grunt watch
```

Copy theme to a versioned release directory and compresses to a zip
```
$ grunt build
```

#### Useful commands

Checks if your NPM or Bower dependencies are out of date.
```
$ grunt versioncheck
```

## Sass Development

Sass files are located in the `assets/css/sass` directory.

All variables are located in `assets/css/sass/utils/_variables.scss`.

## Javascript Development

Initialize all js within `assets/js/src/_init.js`.
