<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package <%= opts.projectTitle %>
 */
$description = get_bloginfo( 'description', 'display' );
?>
<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site off-canvas-wrapper">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '<%= opts.projectSlug %>' ); ?></a>

	<div class="off-canvas position-left" id="js-off-canvas" data-off-canvas>
		<!-- Close button -->
		<button class="close-button" aria-label="Close menu" type="button" data-close>
			<span aria-hidden="true">&times;</span>
		</button>

		<?php if ( has_nav_menu( 'primary-menu' ) ) : ?>
			<nav id="mobile-navigation" class="off-canvas-navigation" aria-label="<?php esc_html_e( 'Primary Mobile Menu', '<%= opts.projectSlug %>' ); ?>">
				<?php
				wp_nav_menu(
					array(
						'container'      => false,
						'theme_location' => 'primary-menu',
						'menu_id'        => 'off-canvas-menu',
						'menu_class'     => 'vertical menu',
						'depth'          => 1,
					)
				);
				?>
			</nav><!-- #site-navigation -->
		<?php endif; ?>
	</div><!-- .off-canvas -->

	<div class="off-canvas-content" data-off-canvas-content>
		<header id="masthead" class="site-header">
			<div class="site-branding">
				<?php
				the_custom_logo();
				if ( is_front_page() && is_home() ) :
					?>
					<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php else : ?>
					<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
					<?php
				endif;

if ( $description || is_customize_preview() ) :
				?>
					<p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
					<?php
				endif;
				?>
			</div><!-- .site-branding -->

			<?php if ( has_nav_menu( 'primary-menu' ) ) : ?>
				<nav id="site-navigation" class="main-navigation show-for-medium" aria-label="<?php esc_html_e( 'Primary Menu', '<%= opts.projectSlug %>' ); ?>">
					<?php
					wp_nav_menu(
						array(
							'container'      => false,
							'theme_location' => 'primary-menu',
							'menu_id'        => 'primary-menu',
							'menu_class'     => 'dropdown menu',
							'items_wrap'     => '<ul id="%1$s" class="%2$s" data-dropdown-menu>%3$s</ul>',
							'walker'         => new Menu_Dropdown_Walker(),
						)
					);
					?>
				</nav><!-- #site-navigation -->

				<?php if ( has_nav_menu( 'social-links-menu' ) ) : ?>
					<nav class="social-navigation show-for-medium" aria-label="<?php esc_html_e( 'Social Links Menu', '<%= opts.projectSlug %>' ); ?>">
						<?php
						wp_nav_menu(
							array(
								'container'      => false,
								'theme_location' => 'social-links-menu',
								'menu_class'     => 'social-links-menu menu',
								'depth'          => 1,
								'link_before'    => '<span class="screen-reader-text">',
								'link_after'     => '</span>',
							)
						);
						?>
					</nav><!-- .social-navigation -->
				<?php endif; ?>
			<?php endif; ?>

			<button class="menu-toggle" data-toggle="js-off-canvas" aria-controls="js-off-canvas" aria-expanded="false">
				<span class="screen-reader-text"><?php esc_html_e( 'Off Canvas Menu', '<%= opts.projectSlug %>' ); ?></span>
			</button>
		</header><!-- #masthead -->

		<div id="content" class="site-content">
