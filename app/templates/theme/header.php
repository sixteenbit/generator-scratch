<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package <%= opts.projectTitle %>
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '<%= opts.projectSlug %>' ); ?></a>

	<header id="masthead" class="site-header" role="banner">

		<?php <%= opts.funcPrefix %>_the_custom_logo(); ?>

		<?php get_template_part( 'components/navigation/title', 'bar' ); ?>

		<?php get_template_part( 'components/navigation/main', 'navigation' ); ?>

		<?php <%= opts.funcPrefix %>_social_menu(); ?>

	</header>

	<div id="content" class="site-content">
