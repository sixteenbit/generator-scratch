<?php

// Useful global constants
define( 'FARO_VERSION', '0.1.0' );
define( 'FARO_URL', get_stylesheet_directory_uri() );
define( 'FARO_TEMPLATE_URL', get_template_directory_uri() );
define( 'FARO_PATH', get_template_directory() . '/' );
define( 'FARO_INC', FARO_PATH . 'inc/' );

/**
 * <%= opts.projectTitle %> only works in WordPress 4.2 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.2', '<' ) ) {
	require FARO_TEMPLATE_URL . '/inc/back-compat.php';
}

// Includes
require_once FARO_INC . 'core.php';
require_once FARO_INC . 'custom-header.php';
require_once FARO_INC . 'template-tags.php';
require_once FARO_INC . 'extras.php';
require_once FARO_INC . 'jetpack.php';
require_once FARO_INC . 'walker.php';