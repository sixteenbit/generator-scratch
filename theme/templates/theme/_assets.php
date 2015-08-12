<?php
/**
 * Enqueue scripts and stylesheets
 *
 * @package <%= opts.projectTitle %>
 */
function <%= opts.funcPrefix %>_scripts() {

	$live_reload 	= get_theme_mod( '<%= opts.funcPrefix %>_reload' );;
	$minification = get_theme_mod( '<%= opts.funcPrefix %>_minify' );;

	if ( true !== $minification ) {
		$assets = array(
			'css'       	=> '/assets/css/main.css',
			<% if ( opts.sass ) { %>'icons'  			=> '/assets/css/font-awesome.css',<% } %>
			'ie'					=> '/assets/js/ie.css',
			'js'        	=> '/assets/js/scripts.js',
			<% if ( opts.sass ) { %>'modernizr' 	=> '/assets/js/vendor/modernizr.js',<% } %>
			'livereload'  => '//localhost:35729/livereload.js'
		);
	} else {
		$assets     = array(
			'css'       	=> '/assets/css/main.min.css?' . <%= opts.funcPrefix.toUpperCase() %>_VERSION,
			<% if ( opts.sass ) { %>'icons'  			=> '/assets/css/font-awesome.min.css?' . <%= opts.funcPrefix.toUpperCase() %>_VERSION,<% } %>
			'ie'					=> '/assets/js/ie.min.css?' . <%= opts.funcPrefix.toUpperCase() %>_VERSION,
			<% if ( opts.sass ) { %>'modernizr' 	=> '/assets/js/vendor/modernizr.min.js' . <%= opts.funcPrefix.toUpperCase() %>_VERSION,<% } %>
			'js'        	=> '/assets/js/scripts.min.js?' . <%= opts.funcPrefix.toUpperCase() %>_VERSION
		);
	}

	wp_enqueue_style( '<%= opts.funcPrefix %>-css', <%= opts.funcPrefix.toUpperCase() %>_TEMPLATE_URL . $assets['css'], false, null);
	<% if ( opts.sass ) { %>wp_enqueue_style( '<%= opts.funcPrefix %>-icons', <%= opts.funcPrefix.toUpperCase() %>_TEMPLATE_URL . $assets['icons'], false, null);<% } %>

	wp_enqueue_style( '<%= opts.funcPrefix %>-ie', <%= opts.funcPrefix.toUpperCase() %>_TEMPLATE_URL . $assets['ie'], false, null);
	wp_style_add_data( '<%= opts.funcPrefix %>-ie', 'conditional', 'lt IE 9' );

	if ( is_child_theme() ){
		wp_enqueue_style( '<%= opts.funcPrefix %>-child', <%= opts.funcPrefix.toUpperCase() %>_URL . $assets['css'], false, null);
	}

	if ( is_single() && comments_open() && get_option('thread_comments') ) {
		wp_enqueue_script('comment-reply');
	}

	<% if ( opts.sass ) { %>wp_enqueue_script( '<%= opts.funcPrefix %>-modernizr', <%= opts.funcPrefix.toUpperCase() %>_TEMPLATE_URL . $assets['modernizr'], array(), null, false);<% } %>
	wp_enqueue_script( 'jquery');
	wp_enqueue_script( '<%= opts.funcPrefix %>-js', <%= opts.funcPrefix.toUpperCase() %>_URL . $assets['js'], array(), null, true);

	if ( true == $live_reload ) {
		wp_enqueue_script( 'livereload', $assets['livereload'], '', false, true );
	}
}
add_action('wp_enqueue_scripts', '<%= opts.funcPrefix %>_scripts', 100);
