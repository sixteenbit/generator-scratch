(function ( $ ) {

	// Use this variable to set up the common and page specific functions. If you
	// rename this variable, you will also need to rename the namespace below.
	var <%= opts.projectTitle %> = {
		// All pages
		common: {
			init: function () {
				// JavaScript to be fired on all pages

				// Foundation JavaScript
				// @link http://foundation.zurb.com/docs
				$( document ).foundation();

			}
		},
		// Home page
		home: {
			init: function () {
				// JavaScript to be fired on the home page

			}
		}
	};

	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function ( func, funcname, args ) {
			var namespace = <%= opts.projectTitle %>;
			funcname = (funcname === undefined) ? 'init' : funcname;
			if ( func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function' ) {
				namespace[func][funcname]( args );
			}
		},
		loadEvents: function () {
			UTIL.fire( 'common' );

			$.each(
				document.body.className.replace( /-/g, '_' ).split( /\s+/ ), function ( i, classnm ) {
					UTIL.fire( classnm );
				}
			);
		}
	};

	$( document ).ready( UTIL.loadEvents );

})( jQuery ); // Fully reference jQuery after this point.
