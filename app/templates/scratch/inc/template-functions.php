<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package <%= opts.projectTitle %>
 */

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function <%= opts.funcPrefix %>_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}

add_action( 'wp_head', '<%= opts.funcPrefix %>_pingback_header' );

/**
 * Show kitchen sink by default
 *
 * @param $args
 *
 * @return mixed
 */
function <%= opts.funcPrefix %>_unhide_kitchensink( $args ) {
	$args['wordpress_adv_hidden'] = false;

	return $args;
}

add_filter( 'tiny_mce_before_init', '<%= opts.funcPrefix %>_unhide_kitchensink' );

/**
 * Renames sticky class.
 *
 * @param $classes
 *
 * @return array
 */
function <%= opts.funcPrefix %>_change_sticky_class( $classes ) {
	if ( in_array( 'sticky', $classes, true ) ) {
		$classes   = array_diff( $classes, array( 'sticky' ) );
		$classes[] = 'sticky-post';
	}

	return $classes;
}

add_filter( 'post_class', '<%= opts.funcPrefix %>_change_sticky_class' );

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 *
 * @return array
 */
function <%= opts.funcPrefix %>_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Add class for boxed or fluid for page layouts.
	if ( get_theme_mod( 'page_layout' ) === 'fluid-layout' ) {
		$classes[] = 'fluid-layout';
	} else {
		$classes[] = 'boxed-layout';
	}

	return $classes;
}

add_filter( 'body_class', '<%= opts.funcPrefix %>_body_classes' );
