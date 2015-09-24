<?php
/**
 * Jetpack Compatibility File.
 *
 * @link https://jetpack.me/
 *
 * @package <%= opts.projectTitle %>
 */

/**
 * Add theme support for Infinite Scroll.
 * See: https://jetpack.me/support/infinite-scroll/
 */
function <%= opts.funcPrefix %>_jetpack_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'render'    => '<%= opts.funcPrefix %>_infinite_scroll_render',
		'footer'    => 'page',
	) );
} // end function <%= opts.funcPrefix %>_jetpack_setup
add_action( 'after_setup_theme', '<%= opts.funcPrefix %>_jetpack_setup' );

/**
 * Custom render function for Infinite Scroll.
 */
function <%= opts.funcPrefix %>_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'template-parts/content', get_post_format() );
	}
} // end function <%= opts.funcPrefix %>_infinite_scroll_render
