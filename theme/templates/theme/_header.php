<?php
/**
 * The template for displaying the header.
 *
 * @package <%= opts.projectTitle %>
 * @since 0.1.0
 */
 ?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
<!--[if lt IE 9]>
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/js/ie.js"></script>
<![endif]-->
</head>

<body <?php body_class(); ?>>
  <div id="page" class="outer-wrapper">
    <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '<%= opts.funcPrefix %>' ); ?></a>

    <header id="masthead" class="site-header" role="banner">

    </header><!-- #masthead -->

    <div id="content" class="site-content">
