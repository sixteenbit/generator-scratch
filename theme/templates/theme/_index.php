<?php
/**
 * The main template file.
 *
 * @since 0.1.0
 */
get_header(); ?>

	<?php if (have_posts()) : ?>

		<?php while (have_posts()): the_post(); ?>

			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<header class="entry-header">
					<?php the_title( sprintf( '<h1 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>
				</header><!-- .entry-header -->

				<div class="entry-content">
					<?php
						/* translators: %s: Name of current post */
						the_content( sprintf(
							wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', '<%= opts.funcPrefix %>' ), array( 'span' => array( 'class' => array() ) ) ),
							the_title( '<span class="screen-reader-text">"', '"</span>', false )
						) );
					?>

					<?php
						wp_link_pages( array(
							'before' => '<div class="page-links">' . esc_html__( 'Pages:', '<%= opts.funcPrefix %>' ),
							'after'  => '</div>',
						) );
					?>
				</div><!-- .entry-content -->
			</article><!-- #post-## -->


		<?php endwhile; ?>

	<?php endif; ?>

<?php get_footer();
