# JavaScript source

Grunt will compile all files prefixed with `_` in this directory into `assets/js/theme.js`. Use `src/js/_theme.js` to init any functions since it will be the last file loaded in the DOM.

## DOM-based Routing

Based on http://goo.gl/EUTi53 by Paul Irish

Only fires on body classes that match. If a body class contains a dash, replace the dash with an underscore when adding it to the object below. 

`.noConflict()`

The routing is enclosed within an anonymous function so that you can always reference jQuery with $, even when in .noConflict() mode.
