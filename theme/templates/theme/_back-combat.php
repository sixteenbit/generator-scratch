<?php
/**
 * <%= opts.projectTitle %> back compat functionality
 *
 * Prevents <%= opts.projectTitle %> from running on WordPress versions prior to 4.2,
 * since this theme is not meant to be backward compatible beyond that and
 * relies on many newer functions and markup changes introduced in 4.2.
 *
 * @package <%= opts.projectTitle %>
 */

/**
 * Prevent switching to <%= opts.projectTitle %> on old versions of WordPress.
 *
 * Switches to the default theme.
 */
function <%= opts.funcPrefix %>_switch_theme() {
	switch_theme( WP_DEFAULT_THEME, WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', '<%= opts.funcPrefix %>_upgrade_notice' );
}
add_action( 'after_switch_theme', '<%= opts.funcPrefix %>_switch_theme' );

/**
 * Add message for unsuccessful theme switch.
 *
 * Prints an update nag after an unsuccessful attempt to switch to
 * <%= opts.projectTitle %> on WordPress versions prior to 4.2.
 */
function <%= opts.funcPrefix %>_upgrade_notice() {
	$message = sprintf( esc_html__( '<%= opts.projectTitle %> requires at least WordPress version 4.2. You are running version %s. Please upgrade and try again.', '<%= opts.funcPrefix %>' ), $GLOBALS['wp_version'] );
	printf( '<div class="error"><p>%s</p></div>', $message );
}

/**
 * Prevent the Customizer from being loaded on WordPress versions prior to 4.2.
 */
function <%= opts.funcPrefix %>_customize() {
	wp_die( sprintf( esc_html__( '<%= opts.projectTitle %> requires at least WordPress version 4.2. You are running version %s. Please upgrade and try again.', '<%= opts.funcPrefix %>' ), $GLOBALS['wp_version'] ), '', array(
		'back_link' => true,
	) );
}
add_action( 'load-customize.php', '<%= opts.funcPrefix %>_customize' );

/**
 * Prevent the Theme Preview from being loaded on WordPress versions prior to 4.2.
 */
function <%= opts.funcPrefix %>_preview() {
	if ( isset( $_GET['preview'] ) ) {
		wp_die( sprintf( esc_html__( '<%= opts.projectTitle %> requires at least WordPress version 4.2. You are running version %s. Please upgrade and try again.', '<%= opts.funcPrefix %>' ), $GLOBALS['wp_version'] ) );
	}
}
add_action( 'template_redirect', '<%= opts.funcPrefix %>_preview' );
