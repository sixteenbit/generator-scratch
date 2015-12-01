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


function remove_sticky_class( $classes ) {
	$classes   = array_diff( $classes, array( 'sticky' ) );
	$classes[] = 'sticky-post';

	return $classes;
}

add_filter( 'post_class', 'remove_sticky_class' );

if ( 'video' == get_post_format( get_the_ID() ) ) {
	function <%= opts.funcPrefix %>_embed_oembed_html( $html, $url, $attr, $post_id ) {
		return '<div class="flex-video widescreen">' . $html . '</div>';
	}

	add_filter( 'embed_oembed_html', '<%= opts.funcPrefix %>_embed_oembed_html', 99, 4 );
}