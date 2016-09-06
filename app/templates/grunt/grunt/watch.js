module.exports = {
  /**
   * grunt-contrib-watch
   *
   * Run predefined tasks whenever watched file patterns are
   * added, changed or deleted.
   *
   * @link https://www.npmjs.com/package/grunt-contrib-watch
   */
  styles: {
    files: ['assets/sass/**/*.scss'],
    tasks: ['styles']
  },
  scripts: {
    files: ['assets/js/src/**/*.js'],
    tasks: ['scripts']
  },
  browserSync: {
    files: [
      '*.php',
      '**/*.php',
      '*.css',
      'Gruntfile.js',
      '*.css',
      'assets/js/*.js',
      'assets/css/*.css'
    ],
    options: {
      watchTask: true
    }
  }
};
