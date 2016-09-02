<?php
/**
 * <%= opts.projectTitle %> Theme Customizer.
 *
 * @package <%= opts.projectTitle %>
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function <%= opts.funcPrefix %>_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
}

add_action( 'customize_register', '<%= opts.funcPrefix %>_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function <%= opts.funcPrefix %>_customize_preview_js() {
	wp_enqueue_script( '<%= opts.funcPrefix %>_customizer', get_template_directory_uri() . '/assets/js/customizer.js', array( 'customize-preview' ), <%= opts.funcPrefix.toUpperCase() %>_VERSION, true );
}

add_action( 'customize_preview_init', '<%= opts.funcPrefix %>_customize_preview_js' );
