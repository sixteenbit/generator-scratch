<?php

// Useful global constants
define( '<%= opts.funcPrefix.toUpperCase() %>_VERSION', '0.1.0' );
define( '<%= opts.funcPrefix.toUpperCase() %>_URL', get_stylesheet_directory_uri() );
define( '<%= opts.funcPrefix.toUpperCase() %>_TEMPLATE_URL', get_template_directory_uri() );
define( '<%= opts.funcPrefix.toUpperCase() %>_PATH', get_template_directory() . '/' );
define( '<%= opts.funcPrefix.toUpperCase() %>_INC', <%= opts.funcPrefix.toUpperCase() %>_PATH . 'inc/' );

/**
 * <%= opts.projectTitle %> only works in WordPress 4.2 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.2', '<' ) ) {
	require <%= opts.funcPrefix.toUpperCase() %>_TEMPLATE_URL . '/inc/back-compat.php';
}

// Includes
require_once <%= opts.funcPrefix.toUpperCase() %>_INC . 'core.php';
require_once <%= opts.funcPrefix.toUpperCase() %>_INC . 'custom-header.php';
require_once <%= opts.funcPrefix.toUpperCase() %>_INC . 'template-tags.php';
require_once <%= opts.funcPrefix.toUpperCase() %>_INC . 'extras.php';
require_once <%= opts.funcPrefix.toUpperCase() %>_INC . 'jetpack.php';
require_once <%= opts.funcPrefix.toUpperCase() %>_INC . 'walker.php';