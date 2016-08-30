<?php

/**
 * Class F6_TOPBAR_MENU_WALKER
 */
class F6_TOPBAR_MENU_WALKER extends Walker_Nav_Menu {
	/**
	 * Add vertical menu class and submenu data attribute to sub menus
	 *
	 * @param string $output
	 * @param int $depth
	 * @param array $args
	 */
	function start_lvl( &$output, $depth = 0, $args = array() ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul class=\"vertical menu\" data-submenu>\n";
	}
}

/**
 * Class F6_DRILL_MENU_WALKER
 */
class F6_DRILL_MENU_WALKER extends Walker_Nav_Menu {
	/**
	 * Add vertical menu class
	 *
	 * @param string $output
	 * @param int $depth
	 * @param array $args
	 */
	function start_lvl( &$output, $depth = 0, $args = array() ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul class=\"vertical menu\">\n";
	}
}
