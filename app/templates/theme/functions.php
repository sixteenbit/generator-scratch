<?php
/**
 * <%= opts.projectTitle %> functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package <%= opts.projectTitle %>
 */

/**
 * <%= opts.projectTitle %> only works in WordPress 4.7 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.7-alpha', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';

	return;
}

$theme_data    = wp_get_theme( get_option( 'template' ) );
$theme_version = $theme_data->Version;

define( '<%= opts.funcPrefix.toUpperCase() %>_VERSION', $theme_version );

if ( ! function_exists( '<%= opts.funcPrefix %>_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function <%= opts.funcPrefix %>_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on components, use a find and replace
		 * to change '<%= opts.projectSlug %>' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( '<%= opts.projectSlug %>', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 1088, 9999 );
		add_image_size( '<%= opts.projectSlug %>-featured-image', 640, 9999 );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary' => esc_html__( 'Primary', '<%= opts.projectSlug %>' )
		) );

		/**
		 * Add support for core custom logo.
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 200,
			'width'       => 200,
			'flex-width'  => true,
			'flex-height' => true,
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( '<%= opts.funcPrefix %>_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/*
		 * This theme styles the visual editor to resemble the theme style,
		 * specifically font, colors, icons, and column width.
		 */
		add_editor_style( array(
			'assets/css/main.css',
			'editor-style.css'
		) );
	}
endif;

add_action( 'after_setup_theme', '<%= opts.funcPrefix %>_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function <%= opts.funcPrefix %>_content_width() {
	$GLOBALS['content_width'] = apply_filters( '<%= opts.funcPrefix %>_content_width', 640 );
}

add_action( 'after_setup_theme', '<%= opts.funcPrefix %>_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function <%= opts.funcPrefix %>_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', '<%= opts.projectSlug %>' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}

add_action( 'widgets_init', '<%= opts.funcPrefix %>_widgets_init' );

/**
 * Handles JavaScript detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 */
function <%= opts.funcPrefix %>_javascript_detection() {
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}

add_action( 'wp_head', '<%= opts.funcPrefix %>_javascript_detection', 0 );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function <%= opts.funcPrefix %>_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">' . "\n", get_bloginfo( 'pingback_url' ) );
	}
}
add_action( 'wp_head', '<%= opts.funcPrefix %>_pingback_header' );

/**
 * Enqueue scripts and styles.
 */
function <%= opts.funcPrefix %>_scripts() {
	$suffix = is_rtl() ? '-rtl' : '';

	// Load our main stylesheet.
	wp_enqueue_style( '<%= opts.projectSlug %>-main', get_theme_file_uri( '/assets/css/main' . $suffix . '.css' ), array( '<%= opts.projectSlug %>-style' ), <%= opts.funcPrefix.toUpperCase() %>_VERSION );

	// Theme stylesheet.
	wp_enqueue_style( '<%= opts.projectSlug %>-style', get_stylesheet_uri() );

	// Helps with accessibility for keyboard only users.
	wp_enqueue_script( '<%= opts.projectSlug %>-foundation', get_theme_file_uri( '/assets/js/skip-link-focus-fix.js' ), array(), <%= opts.funcPrefix.toUpperCase() %>_VERSION, true );

	// Load our Foundation scripts.
	wp_enqueue_script( '<%= opts.projectSlug %>-skip-link-focus-fix', get_theme_file_uri( '/assets/js/foundation.js' ), array(), <%= opts.funcPrefix.toUpperCase() %>_VERSION, true );

	// Load our functions scripts.
	wp_enqueue_script( '<%= opts.projectSlug %>-scripts', get_theme_file_uri( '/assets/js/scripts.js' ), array( 'jquery' ), <%= opts.funcPrefix.toUpperCase() %>_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_action( 'wp_enqueue_scripts', '<%= opts.funcPrefix %>_scripts' );

/**
 * Custom template tags for this theme.
 */
require get_parent_theme_file_path( '/inc/template-tags.php' );

/**
 * Custom functions that act independently of the theme templates.
 */
require get_parent_theme_file_path( '/inc/extras.php' );

/**
 * Customizer additions.
 */
require get_parent_theme_file_path( '/inc/customizer.php' );

/**
 * Load Jetpack compatibility file.
 */
require get_parent_theme_file_path( '/inc/jetpack.php' );

/**
 * Load custom menu walkers.
 */
require get_parent_theme_file_path( '/inc/walkers.php' );
