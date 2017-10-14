# Scratch

## About

Scratch is a starter theme generator based on _s and Foundation. It's a theme meant for hacking so don't use it as a Parent Theme. Instead try turning it into the next, most awesome, WordPress theme out there.

## Setup

#### Install Yeoman

    npm install -g yo

#### Install Grunt.js

    npm install -g grunt-cli

#### Install generator-scratch

    npm install -g generator-scratch

Lots of code will happen. This may take a few minutes. Go make a beverage! When it's done you can use the generator like so... Navigate to your development WordPress theme folder [change path as needed]:

    cd public_html/wordpress-root/wp-content/themes

Run the generator

    yo scratch

You will be prompted with a few basic questions to help the setup get started. Once you get past the description question you will again see lots of code. That's grunt and bower doing their thing. It's also time to drink your beverage!

Navigate to your new theme:

    cd newtheme

In the root of your theme, run the following:

`npm i`

Then run `grunt` to build the project.
