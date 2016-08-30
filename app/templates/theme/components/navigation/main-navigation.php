<?php if ( has_nav_menu( 'primary-1' ) ) : ?>
	<nav id="site-navigation" class="main-navigation top-bar" role="navigation">
		<?php get_template_part( 'components/header/site', 'branding' ); ?>

		<?php
		wp_nav_menu(
			array(
				'theme_location'  => 'primary-1',
				'menu_id'         => 'primary-menu',
				'container_class' => 'top-bar-right',
				'menu_class'      => 'dropdown menu',
				'items_wrap'      => '<ul id="%1$s" class="%2$s" data-dropdown-menu>%3$s</ul>',
				'walker'          => new F6_TOPBAR_MENU_WALKER(),
			)
		);
		?>
	</nav>
<?php endif; ?>
