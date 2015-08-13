# <%= opts.projectTitle %>

## Getting Started

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

**[Yeoman](http://yeoman.io/)**

```
$ npm install -g yo
```

### Core commands

Compile Sass to CSS and minify
```
$ grunt css
```

Concatenate scripts and minify
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

### Useful commands

Checks if your NPM or Bower dependencies are out of date.
```
$ grunt versioncheck
```
