# Scratch

## About

Scratch is a starter theme generator based on <code>_s</code> and <code>Foundation</code>. It's a theme meant for hacking so don't use it as a <em>Parent Theme</em>. Instead try turning it into the next, most awesome, WordPress theme out there.

## Setup

#### Install Yeoman

    npm install -g yo
    
#### Install Grunt.js

    npm install -g grunt-cli

#### Install generator-scratch

    npm install -g generator-scratch

Lot's of code will happen. This may take a few minutes. Go make a beverage! When it's done you can use the generator like so... Navigate to your development WordPress theme folder [change path as needed]:

    cd ~/Sites/Development/Wordpress/wp-content/themes

Run the generator

    yo scratch

You will be prompted with a few basic questions to help the setup get started. Once you get past the description question you will again see lots of code. That's grunt and bower doing their thing. It's also time to drink your beverage!

Navigate to your new theme:

    cd newtheme
    
In the root of your theme, run the following:

`npm i && bower i`

Then run `grunt` to build the project.


## Development

In your wp-content/themes folder you will now have a folder with the name of your theme which is setup with the basics to get a theme off the ground quickly. In the root of your newly created theme you'll have the following grunt tasks you can run:

    grunt setup # copies foundation dev files from bower to dev directory
    grunt # runs the default task that builds the assets
    grunt server # initiates Browsersync and watches files for changes

## Production

When you're done and ready to go live you'll need to minify your assets and whatnot. You can do this by using:

    grunt build
    
This will minify all your assets and copy the theme to a dist/ directory then compresses to a .zip.

### Theme structure

- /assets/sass/ - Development Sass files that is compiled into assets/css/main.css.
- /assets/js/src/ - Development js that is concatenated to /assets/js/.
- style.css - names and sets up your theme as far as WordPress is concerned.
functions.php - your theme functions
- *.php your theme files


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
