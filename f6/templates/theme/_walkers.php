<?php

class <%= opts.funcPrefix.toUpperCase() %>_TOPBAR_MENU_WALKER extends Walker_Nav_Menu {
	/**
	 * Add vertical menu class and submenu data attribute to sub menus
	 */
	function start_lvl( &$output, $depth = 0, $args = array() ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul class=\"submenu menu vertical\" data-submenu>\n";
	}
}

class <%= opts.funcPrefix.toUpperCase() %>_DRILL_MENU_WALKER extends Walker_Nav_Menu {
	/*
	 * Add vertical menu class
	 */

	function start_lvl( &$output, $depth = 0, $args = array() ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul class=\"vertical submenu menu\">\n";
	}
}