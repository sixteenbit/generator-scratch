/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * <%= opts.projectTitle %>
 * <%= opts.projectHome %>
 *
 * Copyright (c) <%= new Date().getFullYear() %> <%= opts.authorName %>
 * Licensed under the GPLv2+ license.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var <%= opts.funcPrefix.toUpperCase() %> = {
    // All pages
    common: {
      init: function() {
        // JavaScript to be fired on all pages

        /**
         * skip-link-focus-fix.js
         *
         * Helps with accessibility for keyboard only users.
         *
         * Learn more: https://github.com/Automattic/Scratch/pull/136
         */
        ( function() {
        	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
        	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
        	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

        	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
        		window.addEventListener( 'hashchange', function() {
        			var id = location.hash.substring( 1 ),
        				element;

        			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
        				return;
        			}

        			element = document.getElementById( id );

        			if ( element ) {
        				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
        					element.tabIndex = -1;
        				}

        				element.focus();
        			}
        		}, false );
        	}
        })();

        <% if ( opts.sass ) { %>// Foundation JavaScript
        // Documentation can be found at: http://foundation.zurb.com/docs
        $(document).foundation();<% } %>

      }
    },
    // Home page
    home: {
      init: function() {
        // JavaScript to be fired on the home page

      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var namespace = <%= opts.funcPrefix.toUpperCase() %>;
      funcname = (funcname === undefined) ? 'init' : funcname;
      if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      UTIL.fire('common');

      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
      });
    }
  };

  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
