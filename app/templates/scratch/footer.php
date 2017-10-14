<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package <%= opts.projectTitle %>
 */

?>

		</div><!-- #content -->

		<footer id="colophon" class="site-footer">
			<div class="site-info">
				<?php
				echo sprintf(
					// translators: %s Date for copyright
					esc_html__( '&copy; %s. All rights reserved.', '<%= opts.projectSlug %>' ),
					esc_attr( current_time( 'Y' ) ) . ' ' . esc_html( get_bloginfo( 'name' ) )
				);
				?>
			</div><!-- .site-info -->
		</footer><!-- #colophon -->
	</div><!-- .off-canvas-content -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
