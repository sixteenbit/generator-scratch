<?php

// Useful global constants
define( 'SCRATCH_VERSION', '0.1.0' );
define( 'SCRATCH_URL', get_stylesheet_directory_uri() );
define( 'SCRATCH_TEMPLATE_URL', get_template_directory_uri() );
define( 'SCRATCH_PATH', get_template_directory() . '/' );
define( 'SCRATCH_INC', SCRATCH_PATH . 'inc/' );

/**
 * <%= opts.projectTitle %> only works in WordPress 4.2 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.2', '<' ) ) {
	require SCRATCH_TEMPLATE_URL . '/inc/back-compat.php';
}

// Includes
require_once SCRATCH_INC . 'core.php';
require_once SCRATCH_INC . 'custom-header.php';
require_once SCRATCH_INC . 'template-tags.php';
require_once SCRATCH_INC . 'extras.php';
require_once SCRATCH_INC . 'jetpack.php';