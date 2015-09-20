<?php
/**
 * Enqueue scripts and stylesheets
 *
 * @package <%= opts.projectTitle %>
 */

function <%= opts.funcPrefix %>_scripts() {

	$production = get_theme_mod( '<%= opts.funcPrefix %>_production' );

	if ( true !== $production ) {
		$assets = array(
			'styles' => '/assets/css/main.css',
			<% if ( opts.sass ) { %>'icons' => '/assets/css/font-awesome.css',<% } %>
			<% if ( opts.sass ) { %>'modernizr' => '/assets/js/vendor/modernizr.js',<% } %>
			'scripts' => '/assets/js/scripts.js',
      'ie-scripts' => '/assets/js/ie.js'
		);
	} else {
		$assets = array(
			'styles' => '/assets/css/main.min.css?' . <%= opts.funcPrefix.toUpperCase() %>_VERSION,
			<% if ( opts.sass ) { %>'icons' => '/assets/css/font-awesome.min.css?' . <%= opts.funcPrefix.toUpperCase() %>_VERSION,<% } %>
			<% if ( opts.sass ) { %>'modernizr' 	=> '/assets/js/vendor/modernizr.min.js?' . <%= opts.funcPrefix.toUpperCase() %>_VERSION,<% } %>
			'scripts' => '/assets/js/scripts.min.js?' . <%= opts.funcPrefix.toUpperCase() %>_VERSION,
      'ie-scripts' => '/assets/js/ie.min.js?' . <%= opts.funcPrefix.toUpperCase() %>_VERSION
		);
	}

	wp_enqueue_style( '<%= opts.funcPrefix %>-css', <%= opts.funcPrefix.toUpperCase() %>_TEMPLATE_URL . $assets['styles'], false, null);
	wp_enqueue_style( '<%= opts.funcPrefix %>-fonts', <%= opts.funcPrefix %>_fonts_url(), array(), null );
	<% if ( opts.sass ) { %>wp_enqueue_style( '<%= opts.funcPrefix %>-icons', <%= opts.funcPrefix.toUpperCase() %>_TEMPLATE_URL . $assets['icons'], false, null);<% } %>

	if ( is_child_theme() ){
		wp_enqueue_style( '<%= opts.funcPrefix %>-child', <%= opts.funcPrefix.toUpperCase() %>_URL . $assets['styles'], false, null);
	}

	if ( is_single() && comments_open() && get_option('thread_comments') ) {
		wp_enqueue_script('comment-reply');
	}

  wp_enqueue_script( '<%= opts.funcPrefix %>-ie-scripts', <%= opts.funcPrefix.toUpperCase() %>_URL . $assets['ie-scripts'], array(), null, false);
  wp_script_add_data( '<%= opts.funcPrefix %>-ie-scripts', 'conditional', 'lt IE 9' );

	<% if ( opts.sass ) { %>wp_enqueue_script( '<%= opts.funcPrefix %>-modernizr', <%= opts.funcPrefix.toUpperCase() %>_TEMPLATE_URL . $assets['modernizr'], array(), null, false);<% } %>
	wp_enqueue_script( 'jquery');
	wp_enqueue_script( '<%= opts.funcPrefix %>-js', <%= opts.funcPrefix.toUpperCase() %>_URL . $assets['scripts'], array(), null, true);
}
add_action('wp_enqueue_scripts', '<%= opts.funcPrefix %>_scripts', 100);
