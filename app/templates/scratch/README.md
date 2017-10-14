# <%= opts.projectTitle %>

<%= opts.projectTitle %> is a starter theme generator based on _s and Foundation. It's a theme meant for hacking so don't use it as a Parent Theme. Instead try turning it into the next, most awesome, WordPress theme out there.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Getting Started

Make sure you have the following installed:

* [Composer](https://getcomposer.org/)
* [Node.js](https://nodejs.org/)
* [Grunt](http://gruntjs.com/)

In the root of the repository, run the following:

```bash
# Install composer dependencies
composer install

# Install grunt dependencies
npm install

# Build the project
grunt
```

## Development

In your wp-content/themes folder you will now have a folder with the name of your theme which is setup with the basics to get a theme off the ground quickly. In the root of your newly created theme you'll have the following grunt tasks you can run:

```bash
# Run the default tasks that build the project
grunt

# Initiate Browsersync and watch files for changes
grunt server
```
