<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package <%= opts.projectTitle %>
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 *
 * @return array
 */
function <%= opts.funcPrefix %>_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	return $classes;
}

add_filter( 'body_class', '<%= opts.funcPrefix %>_body_classes' );

/**
 * Renames sticky class.
 *
 * @param $classes
 *
 * @return array
 */
function <%= opts.funcPrefix %>_change_sticky_class( $classes ) {
	if ( in_array( 'sticky', $classes, true ) ) {
		$classes   = array_diff( $classes, array( "sticky" ) );
		$classes[] = 'sticky-post';
	}

	return $classes;
}

add_filter( 'post_class', '<%= opts.funcPrefix %>_change_sticky_class' );

/**
 * Unregister Core Widgets
 */
function <%= opts.funcPrefix %>_default_widgets() {
	unregister_widget( 'WP_Widget_Pages' );
	unregister_widget( 'WP_Widget_Calendar' );
	unregister_widget( 'WP_Widget_Archives' );
	unregister_widget( 'WP_Widget_Links' );
	unregister_widget( 'WP_Widget_Meta' );
	unregister_widget( 'WP_Widget_Search' );
	unregister_widget( 'WP_Widget_Recent_Comments' );
	unregister_widget( 'WP_Widget_RSS' );
	unregister_widget( 'WP_Widget_Tag_Cloud' );
}

add_action( 'widgets_init', '<%= opts.funcPrefix %>_default_widgets', 10 );

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
 * Callback function to filter the MCE settings
 *
 * @param $buttons
 *
 * @return mixed
 */
function <%= opts.funcPrefix %>_mce_buttons( $buttons ) {
	array_unshift( $buttons, 'styleselect' );

	return $buttons;
}

add_filter( 'mce_buttons_2', '<%= opts.funcPrefix %>_mce_buttons' );

/**
 * Add custom formats to TinyMCE
 *
 * @param $init_array
 *
 * @return mixed
 */
function <%= opts.funcPrefix %>_insert_formats( $init_array ) {
	$style_formats               = array(
		array(
			'title'   => 'Float Left',
			'block'   => 'span',
			'classes' => 'float-left',
			'wrapper' => true,
		),
		array(
			'title'   => 'Float Right',
			'block'   => 'span',
			'classes' => 'float-right',
			'wrapper' => true,
		),
		array(
			'title'   => 'Button',
			'block'   => 'a',
			'classes' => 'button',
			'wrapper' => true,
		),
		array(
			'title'   => 'Label',
			'block'   => 'span',
			'classes' => 'label',
			'wrapper' => true,
		),
		array(
			'title'   => 'Badge',
			'block'   => 'span',
			'classes' => 'badge',
			'wrapper' => true,
		),
		array(
			'title'   => 'Callout',
			'block'   => 'div',
			'classes' => 'callout',
			'wrapper' => true,
		)
	);
	$init_array['style_formats'] = json_encode( $style_formats );

	return $init_array;
}

add_filter( 'tiny_mce_before_init', '<%= opts.funcPrefix %>_insert_formats' );
