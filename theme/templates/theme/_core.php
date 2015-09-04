<?php
/**
 * <%= opts.projectTitle %> functions and definitions.
 *
 * @link https://codex.wordpress.org/Functions_File_Explained
 *
 * @package <%= opts.projectTitle %>
 */

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
	 * If you're building a theme based on <%= opts.projectTitle %>, use a find and replace
	 * to change '<%= opts.funcPrefix %>' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( '<%= opts.funcPrefix %>', get_template_directory() . '/languages' );

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

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', '<%= opts.funcPrefix %>' ),
		'social' => esc_html__( 'Social Menu', '<%= opts.funcPrefix %>' )
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

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( '<%= opts.funcPrefix %>_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

  /*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, icons, and column width.
	 */
	add_editor_style( array( 'assets/css/editor-style.css', <%= opts.funcPrefix %>_fonts_url() ) );
}
endif; // <%= opts.funcPrefix %>_setup
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
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function <%= opts.funcPrefix %>_widgets_init() {
	register_sidebar(array(
	  'name' => esc_html__('Sidebar', '<%= opts.funcPrefix %>'),
	  'id' => 'sidebar-1',
	  'description' => 'Add widgets here to appear in your sidebar.',
	  'before_widget' => '<aside id="%1$s" class="widget %2$s">',
	  'after_widget' => '</aside>',
	  'before_title' => '<h3 class="widget-title">',
	  'after_title' => '</h3>',
	));
}
add_action('widgets_init', '<%= opts.funcPrefix %>_widgets_init');

if ( ! function_exists( '<%= opts.funcPrefix %>_fonts_url' ) ) :
/**
 * Register Google fonts for <%= opts.projectTitle %>.
 *
 * @return string Google fonts URL for the theme.
 */
function <%= opts.funcPrefix %>_fonts_url() {
  $fonts_url = '';
  $fonts     = array();
  $subsets   = 'latin,latin-ext';

  /* translators: If there are characters in your language that are not supported by Open Sans, translate this to 'off'. Do not translate into your own language. */
  if ( 'off' !== _x( 'on', 'Open Sans font: on or off', '<%= opts.funcPrefix %>' ) ) {
    $fonts[] = 'Open Sans:400,300,400italic,600,700,800';
  }

  /* translators: To add an additional character subset specific to your language, translate this to 'greek', 'cyrillic', 'devanagari' or 'vietnamese'. Do not translate into your own language. */
  $subset = _x( 'no-subset', 'Add new subset (greek, cyrillic, devanagari, vietnamese)', '<%= opts.funcPrefix %>' );
  if ( 'cyrillic' == $subset ) {
    $subsets .= ',cyrillic,cyrillic-ext';
  } elseif ( 'greek' == $subset ) {
    $subsets .= ',greek,greek-ext';
  } elseif ( 'devanagari' == $subset ) {
    $subsets .= ',devanagari';
  } elseif ( 'vietnamese' == $subset ) {
    $subsets .= ',vietnamese';
  }
  if ( $fonts ) {
    $fonts_url = add_query_arg( array(
      'family' => urlencode( implode( '|', $fonts ) ),
      'subset' => urlencode( $subsets ),
    ), '//fonts.googleapis.com/css' );
  }
  return $fonts_url;
}
endif;
