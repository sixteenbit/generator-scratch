<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package <%= opts.projectTitle %>
 */

 /*
  * Unregister Core Widgets
  */
 function <%= opts.funcPrefix %>_default_widgets() {
 	unregister_widget('WP_Widget_Pages');
 	unregister_widget('WP_Widget_Calendar');
 	unregister_widget('WP_Widget_Archives');
 	unregister_widget('WP_Widget_Links');
 	unregister_widget('WP_Widget_Meta');
 	// unregister_widget('WP_Widget_Search');
 	// unregister_widget('WP_Widget_Text');
 	// unregister_widget('WP_Widget_Categories');
 	unregister_widget('WP_Widget_Recent_Posts');
 	unregister_widget('WP_Widget_Recent_Comments');
 	unregister_widget('WP_Widget_RSS');
 	unregister_widget('WP_Widget_Tag_Cloud');
 	// unregister_widget('WP_Nav_Menu_Widget');
 }
 add_action('widgets_init', '<%= opts.funcPrefix %>_default_widgets', 11);

 /*
  * Callback function to filter the MCE settings
  */
 function <%= opts.funcPrefix %>_mce_buttons($buttons) {
 	array_unshift($buttons, 'styleselect');
 	return $buttons;
 }
 add_filter('mce_buttons_2', '<%= opts.funcPrefix %>_mce_buttons');

 function <%= opts.funcPrefix %>_insert_formats( $init_array ) {
 	$style_formats = array(
 		array(
 			'title' => 'Primary Button',
 			'block' => 'a',
 			'classes' => 'button',
 			'wrapper' => true,
 		),
 		array(
 			'title' => 'Secondary Button',
 			'block' => 'a',
 			'classes' => 'secondary button',
 			'wrapper' => true,
 		),
 		array(
 			'title' => 'Primary Label',
 			'block' => 'span',
 			'classes' => 'label',
 			'wrapper' => true,
 		),
 		array(
 			'title' => 'Secondary Label',
 			'block' => 'span',
 			'classes' => 'secondary label',
 			'wrapper' => true,
 		),
 		array(
 			'title' => 'Panel',
 			'block' => 'div',
 			'classes' => 'panel',
 			'wrapper' => true,
 		),
 		array(
 			'title' => 'Callout Panel',
 			'block' => 'div',
 			'classes' => 'callout panel',
 			'wrapper' => true,
 		)
 	);
 	$init_array['style_formats'] = json_encode( $style_formats );

 	return $init_array;
 }
 add_filter( 'tiny_mce_before_init', '<%= opts.funcPrefix %>_insert_formats' );

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function <%= opts.funcPrefix %>_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	return $classes;
}
add_filter( 'body_class', '<%= opts.funcPrefix %>_body_classes' );

if ( version_compare( $GLOBALS['wp_version'], '4.1', '<' ) ) :
	/**
	 * Filters wp_title to print a neat <title> tag based on what is being viewed.
	 *
	 * @param string $title Default title text for current view.
	 * @param string $sep Optional separator.
	 * @return string The filtered title.
	 */
	function <%= opts.funcPrefix %>_wp_title( $title, $sep ) {
		if ( is_feed() ) {
			return $title;
		}

		global $page, $paged;

		// Add the blog name.
		$title .= get_bloginfo( 'name', 'display' );

		// Add the blog description for the home/front page.
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) ) {
			$title .= " $sep $site_description";
		}

		// Add a page number if necessary.
		if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
			$title .= " $sep " . sprintf( esc_html__( 'Page %s', '<%= opts.funcPrefix %>' ), max( $paged, $page ) );
		}

		return $title;
	}
	add_filter( 'wp_title', '<%= opts.funcPrefix %>_wp_title', 10, 2 );

	/**
	 * Title shim for sites older than WordPress 4.1.
	 *
	 * @link https://make.wordpress.org/core/2014/10/29/title-tags-in-4-1/
	 * @todo Remove this function when WordPress 4.3 is released.
	 */
	function <%= opts.funcPrefix %>_render_title() {
		?>
		<title><?php wp_title( '|', true, 'right' ); ?></title>
		<?php
	}
	add_action( 'wp_head', '<%= opts.funcPrefix %>_render_title' );
endif;
