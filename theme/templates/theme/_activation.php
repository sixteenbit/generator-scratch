<?php
/**
 * Theme activation
 */
if (is_admin() && isset($_GET['activated']) && 'themes.php' == $GLOBALS['pagenow']) {
	wp_redirect(admin_url('themes.php?page=theme_activation_options'));
	exit;
}

function <%= opts.funcPrefix %>_theme_activation_options_init() {
	register_setting(
		'<%= opts.funcPrefix %>_activation_options',
		'<%= opts.funcPrefix %>_theme_activation_options'
	);
}
add_action('admin_init', '<%= opts.funcPrefix %>_theme_activation_options_init');

function <%= opts.funcPrefix %>_activation_options_page_capability() {
	return 'edit_theme_options';
}
add_filter('option_page_capability_<%= opts.funcPrefix %>_activation_options', '<%= opts.funcPrefix %>_activation_options_page_capability');

function <%= opts.funcPrefix %>_theme_activation_options_add_page() {
	$<%= opts.funcPrefix %>_activation_options = <%= opts.funcPrefix %>_get_theme_activation_options();

	if (!$<%= opts.funcPrefix %>_activation_options) {
		add_theme_page(
			__('Theme Activation', '<%= opts.funcPrefix %>'),
			__('Theme Activation', '<%= opts.funcPrefix %>'),
			'edit_theme_options',
			'theme_activation_options',
			'<%= opts.funcPrefix %>_theme_activation_options_render_page'
		);
	} else {
		if (is_admin() && isset($_GET['page']) && $_GET['page'] === 'theme_activation_options') {
			flush_rewrite_rules();
			wp_redirect(admin_url('themes.php'));
			exit;
		}
	}
}
add_action('admin_menu', '<%= opts.funcPrefix %>_theme_activation_options_add_page', 50);

function <%= opts.funcPrefix %>_get_theme_activation_options() {
	return get_option('<%= opts.funcPrefix %>_theme_activation_options');
}

function <%= opts.funcPrefix %>_theme_activation_options_render_page() { ?>
	<div class="wrap">
		<h2><?php printf(__('%s Theme Activation', '<%= opts.funcPrefix %>'), wp_get_theme()); ?></h2>
		<div class="updated">
			<?php _e('<p>These settings are optional and should usually be used only on a fresh installation.</p>', '<%= opts.funcPrefix %>'); ?>
		</div>

		<?php settings_errors(); ?>

		<form method="post" action="options.php">
			<?php settings_fields('<%= opts.funcPrefix %>_activation_options'); ?>
			<table class="form-table">
				<tr valign="top"><th scope="row"><?php _e('Create a style guide?', '<%= opts.funcPrefix %>'); ?></th>
					<td>
						<fieldset>
							<legend class="screen-reader-text"><span><?php _e('Create a style guide?', '<%= opts.funcPrefix %>'); ?></span></legend>
							<select name="<%= opts.funcPrefix %>_theme_activation_options[create_style_guide]" id="create_style_guide">
								<option selected="selected" value="true"><?php echo _e('Yes', '<%= opts.funcPrefix %>'); ?></option>
								<option value="false"><?php echo _e('No', '<%= opts.funcPrefix %>'); ?></option>
							</select>
							<p class="description"><?php printf(__('Create a page called Style Guide to show theme styles', '<%= opts.funcPrefix %>')); ?></p>
						</fieldset>
					</td>
				</tr>
				<tr valign="top"><th scope="row"><?php _e('Change permalink structure?', '<%= opts.funcPrefix %>'); ?></th>
					<td>
						<fieldset>
							<legend class="screen-reader-text"><span><?php _e('Update permalink structure?', '<%= opts.funcPrefix %>'); ?></span></legend>
							<select name="<%= opts.funcPrefix %>_theme_activation_options[change_permalink_structure]" id="change_permalink_structure">
								<option selected="selected" value="true"><?php echo _e('Yes', '<%= opts.funcPrefix %>'); ?></option>
								<option value="false"><?php echo _e('No', '<%= opts.funcPrefix %>'); ?></option>
							</select>
							<p class="description"><?php printf(__('Change permalink structure to /&#37;postname&#37;/', '<%= opts.funcPrefix %>')); ?></p>
						</fieldset>
					</td>
				</tr>
				<tr valign="top"><th scope="row"><?php _e('Create navigation menu?', '<%= opts.funcPrefix %>'); ?></th>
					<td>
						<fieldset>
							<legend class="screen-reader-text"><span><?php _e('Create navigation menu?', '<%= opts.funcPrefix %>'); ?></span></legend>
							<select name="<%= opts.funcPrefix %>_theme_activation_options[create_navigation_menus]" id="create_navigation_menus">
								<option selected="selected" value="true"><?php echo _e('Yes', '<%= opts.funcPrefix %>'); ?></option>
								<option value="false"><?php echo _e('No', '<%= opts.funcPrefix %>'); ?></option>
							</select>
							<p class="description"><?php printf(__('Create the Primary Navigation menu and set the location', '<%= opts.funcPrefix %>')); ?></p>
						</fieldset>
					</td>
				</tr>
				<tr valign="top"><th scope="row"><?php _e('Add pages to menu?', '<%= opts.funcPrefix %>'); ?></th>
					<td>
						<fieldset>
							<legend class="screen-reader-text"><span><?php _e('Add pages to menu?', '<%= opts.funcPrefix %>'); ?></span></legend>
							<select name="<%= opts.funcPrefix %>_theme_activation_options[add_pages_to_primary_navigation]" id="add_pages_to_primary_navigation">
								<option selected="selected" value="true"><?php echo _e('Yes', '<%= opts.funcPrefix %>'); ?></option>
								<option value="false"><?php echo _e('No', '<%= opts.funcPrefix %>'); ?></option>
							</select>
							<p class="description"><?php printf(__('Add all current published pages to the Primary Navigation', '<%= opts.funcPrefix %>')); ?></p>
						</fieldset>
					</td>
				</tr>
			</table>
			<?php submit_button(); ?>
		</form>
	</div>

<?php }

function <%= opts.funcPrefix %>_theme_activation_action() {
	if (!($<%= opts.funcPrefix %>_theme_activation_options = <%= opts.funcPrefix %>_get_theme_activation_options())) {
		return;
	}

	if (strpos(wp_get_referer(), 'page=theme_activation_options') === false) {
		return;
	}

	if ($<%= opts.funcPrefix %>_theme_activation_options['create_style_guide'] === 'true') {
		$<%= opts.funcPrefix %>_theme_activation_options['create_style_guide'] = false;

		$default_pages = array(__('Style Guide', '<%= opts.funcPrefix %>'));
		$existing_pages = get_pages();
		$temp = array();

		foreach ($existing_pages as $page) {
			$temp[] = $page->post_title;
		}

		$pages_to_create = array_diff($default_pages, $temp);

		foreach ($pages_to_create as $new_page_title) {
			$add_theme_page = array(
				'post_title' => $new_page_title,
				'post_content' => '<h1>h1. This is a very large header.</h1>
Above is an example of a top level header element, or the
<code>h1</code> tag. All page titles and ledes have been set in this tag. The Second Level Header tag,
<code>h2</code>, has been relegated to any important page level headings.

<hr />

<h2>h2. This is a large header.</h2>
As mentioned above, the Second Level Header has been assigned to important page level headings. Though there is no hard and fast rule regarding the amount of
<code>h1</code> tags allowed on a page, but we tend to always only use one and rely on
<code>h2</code> for critical page headings.
<h3>h3. This is a medium header.</h3>
The Third Level Header may be used for any form of page level headings which falls below the
<code>h2</code> header in a document hierarchy.
<h4>h4. This is a moderate header.</h4>
The Fourth Level Header may be used for any form of page level headings which falls below the
<code>h3</code> header in a document hierarchy.
<h5>h5. This is a small header.</h5>
The Fifth Level Header may be used for any form of page level headings which falls below the
<code>h4</code> header in a document hierarchy.
<h6>h6. This is a tiny header.</h6>
The Sixth Level Header may be used for any form of page level headings which falls below the
<code>h5</code> header in a document hierarchy.

<!--nextpage-->
<h2>Commonly Used Typography Tags</h2>
<h3>Paragraph</h3>
All paragraphs are wrapped with the <code>p</code> tag. This tag can also be wrapped by the <code>blockquote</code> tag if the text is a quote for an external source or a pull quote from an article.
<h3>Block Quotes</h3>
Block quotes are section of content quoted from an external source or quotes pulled from the article itself. The <code>blockquote</code> may contain a <code>p</code> tag. For example, we are quoting Ray Eames, from <a title="Ray Eames quote source" href="http://quotesondesign.com/ray-eames/">Quotes on Design</a>, below.
<blockquote>What works good is better than what looks good, because what works good lasts.</blockquote>
<h3>Inline Quotes</h3>
The <code>q</code> tag is used for short quotations inline within a paragraph. Here is an example of nested quotations.

He said, <q>The official Buzz Lightyear catch phrase is, <q>To infinity and beyond!</q></q>
<h3>Ordered Lists</h3>
Ordered lists, or <code>ol</code> are used to list items in an hierarchical fashion. Each list item, or <code>li</code>, is preceded by a numerical representation of its place in the hierarchy. An ordered list can also contain another ordered list as well as an unordered list, or <code>ul</code>.
<ol>
	<li>This is the first item in an ordered list.</li>
	<li>This is the second item in an ordered list with a sub-ordered list.
<ol>
	<li>This is an ordered list item.</li>
	<li>This is an ordered list item</li>
	<li>This is an ordered list item</li>
</ol>
</li>
	<li>This is the third item in an ordered list.</li>
	<li>This is the fourth item in an ordered list with a sub-unordered list.
<ul>
	<li>This is an unordered list item</li>
	<li>This is an unordered list item</li>
	<li>This is an unordered list item</li>
</ul>
</li>
</ol>
<h3>Unordered Lists</h3>
Unordered lists, or <code>ul</code> are used to list items without any hierarchical value to them. Each list item may be preceded by a bullet or any non numerical representation. An unordered list can also contain an ordered list as well as another unordered list.
<ul>
	<li>This is the first item in an unordered list.</li>
	<li>This is the second item in an unordered list with a sub-ordered list.
<ol>
	<li>This is an ordered list item.</li>
	<li>This is an ordered list item</li>
	<li>This is an ordered list item</li>
</ol>
</li>
	<li>This is the third item in an unordered list.</li>
	<li>This is the fourth item in an unordered list with a sub-unordered list.
<ul>
	<li>This is an unordered list item</li>
	<li>This is an unordered list item</li>
	<li>This is an unordered list item</li>
</ul>
</li>
</ul>
<h3>Definition Lists</h3>
<dl><dt>Startup</dt><dd>A startup company or startup is a company or temporary organization designed to search for a repeatable and scalable business model.</dd><dt>#dowork</dt><dd>Coined by Rob Dyrdek and his personal body guard Christopher "Big Black" Boykins, "Do Work" works as a self motivator, to motivating your friends.</dd><dt>Do It Live</dt><dd>I\'ll let Bill O\'Reilly will <a title="We\'ll Do It Live" href="https://www.youtube.com/watch?v=O_HyZ5aW76c">explain</a> this one.</dd></dl>
<h3>Links</h3>
Links are commonly used to link one page to another, either <a title="Home" href="http://google.com">internally</a> or <a title="The random thoughts of Erik Ford" href="http://google.com" target="_blank">externally</a> and are wrapped by the <code>a</code> tag.
<h3>Button Links</h3>
Buttons can be used stylistically to denote a call to action or any other interactive element within a web document.

<a class="tiny button" href="#">.tiny.button</a>
<a class="small button" href="#">.small.button</a>
<a class="button" href="#">.button</a>
<a class="button expand" href="#">.expand</a>
<a class="tiny button secondary" href="#">.tiny.secondary</a>
<a class="small button success radius" href="#">.small.success.radius</a>
<a class="button alert round disabled" href="#">.round.disabled</a>
<h3>Labels</h3>
<span class="label">Regular Label</span>
<span class="radius secondary label">Radius Secondary Label</span>
<span class="round alert label">Round Alert Label</span>
<span class="success label">Success Label</span>
<h3>Emphasized Text</h3>
Emphasized text is usually relegated to text you would pronounce differently in a conversation or text you are putting a stressed emphasis on and is wrapped inside of the <code>em</code> tag. For example:

Reading <em>this page</em> will help you understand how type is set site wide.
<h3>Strong Text</h3>
Strong text is usually relegated to text you are placing strong emphasis on and is wrapped inside of the <code>strong</code> tag. For example:

Rules for type <strong>should never</strong> be an afterthought.
<h3>Marked or highlighted text</h3>
The <code>mark</code> tag is used for indicating text as marked or highlighted for reference purposes, due to its relevance in another context. The <code>mark</code> tag was introduced in HTML 5. Internet Explorer 8 and older do not support this tag. For example:

Despite the stock market crash in 2008, the value of my share portfolio <mark>increased by 100 percent</mark>. I must be doing something right.
<h3>Small Print</h3>
The <code>small</code> element is used to represent disclaimers, caveats, legal restrictions, or copyrights (commonly referred to as \'small print\'). It can also be used for attributions or satisfying licensing requirements. For example:

<small>Copyright &copy; 2015. Your Company.</small>
<h3>Delete &amp; Insert</h3>
This tag will let you <del>strikeout text</del>, but this tag is no longer supported in HTML5 (use the <code>&lt;strike&gt;</code> instead). This tag should denote <ins>inserted</ins> text.
<h3>Citation</h3>
The <code>cite</code> element is used to represent the title of a work (e.g. a book, essay, poem, song, film, TV show, sculpture, painting, musical, exhibition, etc). This can be a work that is being quoted or referenced in detail (i.e. a citation), or it can just be a work that is mentioned in passing. For example:

I highly recommend reading <cite>Invisible Man</cite> by Ralph Ellison. It changed my life when I was 15 years old.
<h3>Abbreviations &amp; Acronyms</h3>
The <code>abbr</code> element is used for any abbreviated text, whether it be acronym, initialism, or otherwise. Any text in the title attribute will appear when the user\'s mouse hovers the abbreviation. The <code>acronym</code> tag has been dropped from the HTML 5 specs because of the confusion between these two tags. You should exclusively use <code>abbr</code> but both are styled for this theme. For example:

The abbreviation for the National Football League is <abbr title="National Football League">NFL</abbr> and the acronym for as soon as possible is <acronym title="as soon as possible">ASAP</acronym>.
<h3>Subscript &amp; Superscript</h3>
The <code>sub</code> tag defines subscript text. Subscript text appears half a character below the baseline. Subscript text can be used for chemical formulas, like H<sub>2</sub>O.

The <code>sup</code> tag defines superscript text. Superscript text appears half a character above the baseline. Superscript text can be used for footnotes, like this example<sup>[1]</sup>.
<h3>Code &amp; Code Blocks</h3>
The <code>code</code> tag is useful for websites who intend to share computer code snippets. When wrapped by the <code>pre</code> tag, a larger block of code can be displayed.
<pre><code>@media only screen and ( min-width: 43.75em ) and ( max-width: 48.938em ) {
     article {
          width: 69.1563%;
     }
     aside {
          width: 26.6943%;
     }
}</code></pre>
<h2>Tabular Data</h2>
The <code>table</code> tag is best used for presenting tabular data. This tag should always contain the <code>thead</code>, <code>tfoot</code> and <code>tbody</code> tags and should be marked up in that order. The <code>table</code> tag can also contain the <code>caption</code> tag for accessibility.
<table style="width:100%;><caption>Convert Font Sizes from Pixels to Ems or Percentages</caption>
<thead>
<tr>
<th>Pixels</th>
<th>Ems</th>
<th>Percentages</th>
</tr>
</thead>
<tfoot>
<tr>
<td colspan="3">Conversions provided by <a href="http://pxtoem.com/">PXtoEM.com</a></td>
</tr>
</tfoot>
<tbody>
<tr>
<td>16px</td>
<td>1em</td>
<td>100%</td>
</tr>
<tr>
<td>17px</td>
<td>1.063em</td>
<td>106.3%</td>
</tr>
<tr>
<td>18px</td>
<td>1.125em</td>
<td>112.5%</td>
</tr>
<tr>
<td>19px</td>
<td>1.188em</td>
<td>118.8%</td>
</tr>
</tbody>
</table>
<!--nextpage-->
<h2>Image Alignment</h2>
Welcome to image alignment! The best way to demonstrate the ebb and flow of the various image positioning options is to nestle them snuggly among an ocean of words. Grab a paddle and let\'s get started.

On the topic of alignment, it should be noted that users can choose from the options of <em>None</em>, <em>Left</em>, <em>Right, </em>and<em>Center</em>. In addition, they also get the options of <em>Thumbnail</em>, <em>Medium</em>, <em>Large</em> &amp; <em>Fullsize</em>.
<p style="text-align: center;"><img class="size-full aligncenter" title="Image Alignment 580x300" src="http://i.mrdk.in/580x300/1d1d1d/eee.png" alt="Image Alignment 580x300" width="580" height="300" /></p>
The image above happens to be <em><strong>centered</strong></em>.

<strong><img class="size-full alignleft" title="Image Alignment 150x150" src="http://i.mrdk.in/150x150/1d1d1d/eee.png" alt="Image Alignment 150x150" width="150" height="150" /></strong>The rest of this paragraph is filler for the sake of seeing the text wrap around the 150x150 image, which is <em><strong>left aligned</strong></em>.

As you can see the should be some space above, below, and to the right of the image. The text should not be creeping on the image. Creeping is just not right. Images need breathing room too. Let them speak like you words. Let them do their jobs without any hassle from the text. In about one more sentence here, we\'ll see that the text moves from the right of the image down below the image in seamless transition. Again, letting the do it\'s thang. Mission accomplished!

And now for a <em><strong>massively large image</strong></em>. It also has <em><strong>no alignment</strong></em>.

<img class="alignnone" title="Image Alignment 1200x400" src="http://i.mrdk.in/1200x400/1d1d1d/eee.png" alt="Image Alignment 1200x400" width="1200" height="400" />

The image above, though 1200px wide, should not overflow the content area. It should remain contained with no visible disruption to the flow of content.

<img class="size-full alignright" title="Image Alignment 300x200" src="http://i.mrdk.in/300x200/1d1d1d/eee.png" alt="Image Alignment 300x200" width="300" height="200" />

And now we\'re going to shift things to the <em><strong>right align</strong></em>. Again, there should be plenty of room above, below, and to the left of the image. Just look at him there... Hey guy! Way to rock that right side. I don\'t care what the left aligned image says, you look great. Don\'t let anyone else tell you differently.

In just a bit here, you should see the text start to wrap below the right aligned image and settle in nicely. There should still be plenty of room and everything should be sitting pretty. Yeah... Just like that. It never felt so good to be right.

And just when you thought we were done, we\'re going to do them all over again with captions!

[caption id="" align="aligncenter" width="580"]<img class="size-full" title="Image Alignment 580x300" src="http://i.mrdk.in/580x300/1d1d1d/eee.png" alt="Image Alignment 580x300" width="580" height="300" /> Look at 580x300 getting some <a title="Image Settings" href="http://en.support.wordpress.com/images/image-settings/">caption</a> love.[/caption]

The image above happens to be <em><strong>centered</strong></em>. The caption also has a link in it, just to see if it does anything funky.

[caption id="" align="alignleft" width="150"]<img class="size-full" title="Image Alignment 150x150" src="http://i.mrdk.in/150x150/1d1d1d/eee.png" alt="Image Alignment 150x150" width="150" height="150" /> Itty-bitty caption.[/caption]

The rest of this paragraph is filler for the sake of seeing the text wrap around the 150x150 image, which is <em><strong>left aligned</strong></em>.

As you can see the should be some space above, below, and to the right of the image. The text should not be creeping on the image. Creeping is just not right. Images need breathing room too. Let them speak like you words. Let them do their jobs without any hassle from the text. In about one more sentence here, we\'ll see that the text moves from the right of the image down below the image in seamless transition. Again, letting the do it\'s thang. Mission accomplished!

And now for a <em><strong>massively large image</strong></em>. It also has <em><strong>no alignment</strong></em>.

[caption id="" align="alignnone" width="1200"]<img class=" wp-image-907" title="Image Alignment 1200x400" src="http://i.mrdk.in/1200x400/1d1d1d/eee.png" alt="Image Alignment 1200x400" width="1200" height="400" /> Massive image comment for your eyeballs.[/caption]

The image above, though 1200px wide, should not overflow the content area. It should remain contained with no visible disruption to the flow of content.

[caption id="" align="alignright" width="300"]<img class="size-full" title="Image Alignment 300x200" src="http://i.mrdk.in/300x200/1d1d1d/eee.png" alt="Image Alignment 300x200" width="300" height="200" /> Feels good to be right all the time.[/caption]

And now we\'re going to shift things to the <em><strong>right align</strong></em>. Again, there should be plenty of room above, below, and to the left of the image. Just look at him there... Hey guy! Way to rock that right side. I don\'t care what the left aligned image says, you look great. Don\'t let anyone else tell you differently.

In just a bit here, you should see the text start to wrap below the right aligned image and settle in nicely. There should still be plenty of room and everything should be sitting pretty. Yeah... Just like that. It never felt so good to be right.

And that\'s a wrap, yo! You survived the tumultuous waters of alignment. Image alignment achievement unlocked!

<!--nextpage-->
<h2>Embeds</h2>
Third party content can be embedded directly into a page or a post.
<h3>Twitter</h3>
https://twitter.com/wordpress/status/545655921070723072
<h3>Vimeo</h3>
http://vimeo.com/14600175
<h3>YouTube</h3>
http://youtu.be/OTRmyXX6ipU',
				'post_status' => 'publish',
				'post_type' => 'page'
			);

			wp_insert_post($add_theme_page);
		}

		$guide = get_page_by_title(__('Style Guide', '<%= opts.funcPrefix %>'));
		update_option('show_on_front', 'page');
		update_option('page_on_front', $guide->ID);

		$home_menu_order = array(
			'ID' => $guide->ID,
			'menu_order' => -1
		);
		wp_update_post($home_menu_order);
	}

	if ($<%= opts.funcPrefix %>_theme_activation_options['change_permalink_structure'] === 'true') {
		$<%= opts.funcPrefix %>_theme_activation_options['change_permalink_structure'] = false;

		if (get_option('permalink_structure') !== '/%postname%/') {
			global $wp_rewrite;
			$wp_rewrite->set_permalink_structure('/%postname%/');
			flush_rewrite_rules();
		}
	}

	if ($<%= opts.funcPrefix %>_theme_activation_options['create_navigation_menus'] === 'true') {
		$<%= opts.funcPrefix %>_theme_activation_options['create_navigation_menus'] = false;

		$<%= opts.funcPrefix %>_nav_theme_mod = false;

		$primary_nav = wp_get_nav_menu_object(__('Primary Navigation', '<%= opts.funcPrefix %>'));

		if (!$primary_nav) {
			$primary_nav_id = wp_create_nav_menu(__('Primary Navigation', '<%= opts.funcPrefix %>'), array('slug' => 'primary_navigation'));
			$<%= opts.funcPrefix %>_nav_theme_mod['primary_navigation'] = $primary_nav_id;
		} else {
			$<%= opts.funcPrefix %>_nav_theme_mod['primary_navigation'] = $primary_nav->term_id;
		}

		if ($<%= opts.funcPrefix %>_nav_theme_mod) {
			set_theme_mod('nav_menu_locations', $<%= opts.funcPrefix %>_nav_theme_mod);
		}
	}

	if ($<%= opts.funcPrefix %>_theme_activation_options['add_pages_to_primary_navigation'] === 'true') {
		$<%= opts.funcPrefix %>_theme_activation_options['add_pages_to_primary_navigation'] = false;

		$primary_nav = wp_get_nav_menu_object(__('Primary Navigation', '<%= opts.funcPrefix %>'));
		$primary_nav_term_id = (int) $primary_nav->term_id;
		$menu_items= wp_get_nav_menu_items($primary_nav_term_id);

		if (!$menu_items || empty($menu_items)) {
			$pages = get_pages();
			foreach($pages as $page) {
				$item = array(
					'menu-item-object-id' => $page->ID,
					'menu-item-object' => 'page',
					'menu-item-type' => 'post_type',
					'menu-item-status' => 'publish'
				);
				wp_update_nav_menu_item($primary_nav_term_id, 0, $item);
			}
		}
	}

	update_option('<%= opts.funcPrefix %>_theme_activation_options', $<%= opts.funcPrefix %>_theme_activation_options);
}
add_action('admin_init','<%= opts.funcPrefix %>_theme_activation_action');

function <%= opts.funcPrefix %>_deactivation() {
	delete_option('<%= opts.funcPrefix %>_theme_activation_options');
}
add_action('switch_theme', '<%= opts.funcPrefix %>_deactivation');
