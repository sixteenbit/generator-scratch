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
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '<%= opts.projectSlug %>' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="title-bar" data-responsive-toggle="site-navigation" data-hide-for="medium">
			<button class="menu-icon" type="button" data-toggle></button>
			<div class="title-bar-title">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
			</div>
		</div>

		<nav id="site-navigation" class="main-navigation top-bar" role="navigation">
			<div class="top-bar-left show-for-medium">
				<ul class="menu">
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></li>
				</ul>
			</div>
			<div class="top-bar-right">
				<?php wp_nav_menu( array(
					'container'      => false,
					'menu'           => __( 'Primary', '<%= opts.projectSlug %>' ),
					'menu_class'     => 'dropdown vertical medium-horizontal menu',
					'theme_location' => 'primary',
					'items_wrap'     => '<ul id="%1$s" class="%2$s show-for-medium" data-dropdown-menu>%3$s</ul>',
					'fallback_cb'    => false,
					'walker'         => new <%= opts.funcPrefix.toUpperCase() %>_TOPBAR_MENU_WALKER(),
				) ); ?>

				<?php wp_nav_menu( array(
					'container'      => false,
					'menu'           => __( 'Primary', '<%= opts.projectSlug %>' ),
					'menu_class'     => 'vertical menu',
					'theme_location' => 'primary',
					'items_wrap'     => '<ul id="%1$s" class="%2$s show-for-small-only" data-responsive-menu="drilldown medium-dropdown">%3$s</ul>',
					'fallback_cb'    => false,
					'walker'         => new <%= opts.funcPrefix.toUpperCase() %>_DRILL_MENU_WALKER(),
				) ); ?>
			</div><!-- .top-bar-right -->
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
