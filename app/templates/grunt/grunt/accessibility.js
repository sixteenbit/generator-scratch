module.exports = {
	/**
	 * grunt-accessibility
	 *
	 * Grade your site's accessibility and generate a report from different WCAG levels
	 *
	 * @link https://www.npmjs.com/package/grunt-accessibility
	 */
	options: {
		accessibilityLevel: 'WCAG2A',
		ignore: [
			'WCAG2A.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81',
			'WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I',// ignore font awesome <i>
			'WCAG2A.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81,H33'
		]
	},
	home: {
		options: {
			urls: ['local.wordpress.dev']
		}
	}
};
