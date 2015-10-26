'use script';

// Modules
const gulp        = require('gulp'),
      LiveServer  = require('gulp-live-server'),
      browserSync = require('browser-sync'),
      browserify  = require('browserify'),
      reactify    = require('reactify'),
      source      = require('vinyl-source-stream');

// Core
const server = LiveServer.new(['--harmony', 'server/main.js']);  // --harmony Use ES2015/ES6

// Start the live Server
gulp.task('live-server', () => {
	server.start();
});

// Browserify - Create the bundle
gulp.task('bundle', ['copy'], () => {
	return browserify({
		entries : 'app/main.jsx',
		debug   : true
	})
	.transform(reactify)
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./.tmp'));
});

// CSS - copy the files to .tmp
gulp.task('copy', () => {
	gulp.src(['app/*.css', 'bower_components/skeleton/css/*.css'])
	.pipe(gulp.dest('./.tmp'));
});

// Main Task
gulp.task('serve', ['bundle', 'live-server'], () => {
	browserSync.init(null, {
		proxy : 'http://localhost:7777',
		port  : 9001
	});
});
