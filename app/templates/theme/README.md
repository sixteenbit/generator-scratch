# <%= opts.projectTitle %>

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

<%= opts.description %>

## Getting Started

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [Grunt](http://gruntjs.com/)
* [Bower](http://bower.io)
* [Sass](http://sass-lang.com/)

In the root of your project, run the following:

`npm i && bower i`

Then run `grunt` to build the project.

## Development

In your wp-content/themes folder you will now have a folder with the name of your theme which is setup with the basics to get a theme off the ground quickly. In the root of your newly created theme you'll have the following grunt tasks you can run:

    grunt # runs the default task that builds the assets
    grunt server # initiates Browsersync and watches files for changes

## Production

When you're done and ready to go live you'll need to minify your js and whatnot. You can do this by using:

    grunt build
    
This will minify all your assets and copy the theme to a dist/ directory then compresses to a .zip.

### Theme structure

/assets/sass/ - Development Sass files that is compiled into assets/css/main.css.
/assets/js/src/ - Development js that is concatenated to /assets/js/.

style.css - names and sets up your theme as far as WordPress is concerned.
functions.php - your theme functions
*.php your theme files

    themename
    |
    |-assets
    | |-css
    | |-img
    | |-js
    | |-sass
    |   |-layout
    |   |-mixins
    |   |-modules
    |   |-sections
    |   |-shared
    |   |-variables
    |
    |-components
    | |-header
    | |-navigation
    | |-page
    | |-post
    |
    |-grunt
    |
    |-inc
    |
    |-languages
    |
    |*.php
    |style.css
