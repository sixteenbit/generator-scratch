<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package <%= opts.projectTitle %>
 */

?>

	</div>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="row column expanded">
			<?php
			if ( has_nav_menu( 'primary-1' ) ) :
				wp_nav_menu(
					array(
						'container'      => false,
						'theme_location' => 'primary-1',
						'menu_id'        => 'primary-menu',
						'menu_class'     => 'dropdown menu',
						'depth'          => 1
					)
				);
			endif;
			?>

			<div class="site-info">
				<?php echo sprintf( __( '&copy; %s. All rights reserved.', '<%= opts.projectSlug %>' ), date( 'Y' ) . ' ' . esc_html( get_bloginfo( 'name' ) ) ); ?>
			</div><!-- .site-info -->
		</div>
	</footer>
</div>

<?php wp_footer(); ?>

</body>
</html>
