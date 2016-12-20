<?php
/**
 * <%= opts.projectTitle %> back compat functionality
 *
 * Prevents <%= opts.projectTitle %> from running on WordPress versions prior to 4.7,
 * since this theme is not meant to be backward compatible beyond that and
 * relies on many newer functions and markup changes introduced in 4.7.
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since <%= opts.projectTitle %> 1.0
 */

/**
 * Prevent switching to <%= opts.projectTitle %> on old versions of WordPress.
 *
 * Switches to the default theme.
 */
function <%= opts.funcPrefix %>_switch_theme() {
	switch_theme( WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', '<%= opts.funcPrefix %>_upgrade_notice' );
}
add_action( 'after_switch_theme', '<%= opts.funcPrefix %>_switch_theme' );

/**
 * Adds a message for unsuccessful theme switch.
 *
 * Prints an update nag after an unsuccessful attempt to switch to
 * <%= opts.projectTitle %> on WordPress versions prior to 4.7.
 *
 * @global string $wp_version WordPress version.
 */
function <%= opts.funcPrefix %>_upgrade_notice() {
	$message = sprintf( __( '<%= opts.projectTitle %> requires at least WordPress version 4.7. You are running version %s. Please upgrade and try again.', '<%= opts.projectSlug %>' ), $GLOBALS['wp_version'] );
	printf( '<div class="error"><p>%s</p></div>', $message );
}

/**
 * Prevents the Customizer from being loaded on WordPress versions prior to 4.7.
 *
 * @global string $wp_version WordPress version.
 */
function <%= opts.funcPrefix %>_customize() {
	wp_die( sprintf( __( '<%= opts.projectTitle %> requires at least WordPress version 4.7. You are running version %s. Please upgrade and try again.', '<%= opts.projectSlug %>' ), $GLOBALS['wp_version'] ), '', array(
		'back_link' => true,
	) );
}
add_action( 'load-customize.php', '<%= opts.funcPrefix %>_customize' );

/**
 * Prevents the Theme Preview from being loaded on WordPress versions prior to 4.7.
 *
 * @global string $wp_version WordPress version.
 */
function <%= opts.funcPrefix %>_preview() {
	if ( isset( $_GET['preview'] ) ) {
		wp_die( sprintf( __( '<%= opts.projectTitle %> requires at least WordPress version 4.7. You are running version %s. Please upgrade and try again.', '<%= opts.projectSlug %>' ), $GLOBALS['wp_version'] ) );
	}
}
add_action( 'template_redirect', '<%= opts.funcPrefix %>_preview' );
