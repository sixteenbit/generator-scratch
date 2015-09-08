<?php

/**
 * Registers options with the Theme Customizer.
 *
 * @param object $wp_customize The WordPress Theme Customizer
 *
 * @package <%= opts.projectTitle %>
 */

function <%= opts.funcPrefix %>_register_theme_customizer($wp_customize) {

	$wp_customize->add_section( '<%= opts.funcPrefix %>_advanced_settings' , array(
	  'title'      => __('Advanced Settings','<%= opts.projectSlug %>'),
	  'priority'   => 120,
	) );


	$wp_customize->add_setting(
	  '<%= opts.funcPrefix %>_production',
	  array(
	    'default' => false,
			'type' => 'theme_mod',
			'capability' => 'edit_theme_options',
			'sanitize_callback'	=> '<%= opts.funcPrefix %>_sanitize_checkbox'
	  )
	);

	$wp_customize->add_control(
	  // $id
	  '<%= opts.funcPrefix %>_production',
	  // $args
	  array(
		  'settings' => '<%= opts.funcPrefix %>_production',
		  'section' => '<%= opts.funcPrefix %>_advanced_settings',
		  'type' => 'checkbox',
		  'label' => __('Production', '<%= opts.projectSlug %>'),
		  'description' => __('Use minified assets.', '<%= opts.projectSlug %>'),
	  )
	);
} // end <%= opts.funcPrefix %>_register_theme_customizer
add_action('customize_register', '<%= opts.funcPrefix %>_register_theme_customizer');

/**
 * Checkbox sanitization callback.
 *
 * Sanitization callback for 'checkbox' type controls. This callback sanitizes `$checked`
 * as a boolean value, either TRUE or FALSE.
 *
 * @param bool $checked Whether the checkbox is checked.
 * @return bool Whether the checkbox is checked.
 */
function <%= opts.funcPrefix %>_sanitize_checkbox( $checked ) {
	// Boolean check.
	return ( ( isset( $checked ) && true == $checked ) ? true : false );
}
