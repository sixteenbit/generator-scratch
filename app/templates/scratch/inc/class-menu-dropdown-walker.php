<?php

/**
 * Class Menu_Dropdown_Walker
 */
class Menu_Dropdown_Walker extends Walker_Nav_Menu {
	/**
	 * Add vertical menu class and submenu data attribute to sub menus
	 *
	 * @param string $output
	 * @param int $depth
	 * @param array $args
	 */
	function start_lvl( &$output, $depth = 0, $args = array() ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul class=\"menu\">\n";
	}
}
