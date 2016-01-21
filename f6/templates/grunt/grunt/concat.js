module.exports = {
    /**
     * grunt-contrib-concat
     *
     * Concatenate files.
     *
     * Concatenates an array of js files set in /grunt/vars.js
     *
     * @link https://www.npmjs.com/package/grunt-contrib-concat
     */
    options: {
        separator: ';',
        stripBanners: true,
        banner: '/*! <%%= package.title %> - v<%%= package.version %>\n' +
        ' * <%%= package.homepage %>\n' +
        ' * Copyright (c) <%%= grunt.template.today("yyyy") %>;' +
        ' * Licensed GPLv2+' +
        ' */\n'
    },
    main: {
        src: [
            'bower_components/what-input/what-input.js',
            'bower_components/motion-ui/motion-ui.js',
            'bower_components/headroom.js/dist/headroom.js',
            'bower_components/foundation-sites/js/foundation.core.js',
            'bower_components/foundation-sites/js/foundation.util.*.js',

            // Paths to individual JS components defined below
            'bower_components/foundation-sites/js/foundation.abide.js',
            'bower_components/foundation-sites/js/foundation.accordion.js',
            'bower_components/foundation-sites/js/foundation.accordionMenu.js',
            'bower_components/foundation-sites/js/foundation.drilldown.js',
            'bower_components/foundation-sites/js/foundation.dropdown.js',
            'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
            'bower_components/foundation-sites/js/foundation.equalizer.js',
            'bower_components/foundation-sites/js/foundation.interchange.js',
            'bower_components/foundation-sites/js/foundation.magellan.js',
            'bower_components/foundation-sites/js/foundation.offcanvas.js',
            'bower_components/foundation-sites/js/foundation.orbit.js',
            'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
            'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
            'bower_components/foundation-sites/js/foundation.reveal.js',
            'bower_components/foundation-sites/js/foundation.slider.js',
            'bower_components/foundation-sites/js/foundation.sticky.js',
            'bower_components/foundation-sites/js/foundation.tabs.js',
            'bower_components/foundation-sites/js/foundation.toggler.js',
            'bower_components/foundation-sites/js/foundation.tooltip.js',
            'assets/js/src/_init.js'
        ],
        dest: 'assets/js/scripts.js'
    }
};