module.exports = {
    /**
     * grunt-phpcs
     *
     * Grunt plugin for running PHP Code Sniffer.
     *
     * @link https://www.npmjs.com/package/grunt-phpcs
     */
    application: {
        dir: [
            '**/*.php',
            '!**/node_modules/**'
        ]
    },
    options: {
        bin: '~/vagrant-local/www/phpcs/scripts/phpcs',
        standard: 'WordPress'
    }
};