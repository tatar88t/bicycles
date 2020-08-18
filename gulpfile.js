const NODE_ENV = process.env.NODE_ENV || 'development';
const DEV = NODE_ENV == "development";

const gulp = require('gulp');
const rimraf = require('rimraf');
const rename = require("gulp-rename");
const chokidar = require('chokidar');
const gulpIf = require('gulp-if');
const runSequence = require('run-sequence');

const jade = require('gulp-jade');
const htmlMin = require('gulp-htmlmin');

const preproc = require('gulp-css-preprocessor');
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');

const svgSprites = require('gulp-svg-sprites');
const cheerio = require('gulp-cheerio');
const svgmin = require('gulp-svgmin');

const connect = require('gulp-connect');
const browserSync = require('browser-sync');

const path = require('path');

const destFolder = './public';

/* COMMON */

gulp.task('clean', function(opt) {
	rimraf(destFolder, opt);
});
gulp.task('server', function() {
	connect.server({
		root: destFolder + '/',
		port: 8080,
		host: 'localhost',
		name: 'dev-server',
		livereload: true
	});
});
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: destFolder + '/'
		}
	});
});
gulp.task('browser-reload', function() {
	browserSync.reload();
});
gulp.task('watch', function() {
	
	chokidar.watch('./frontend/**/*.css').on('all', function(event, path) {
		console.log(event, path);
		runSequence('css:copy', 'browser-reload');
	});
	chokidar.watch('./frontend/**/*.scss').on('all', function(event, path) {
		console.log(event, path);
		runSequence('scss:build', 'browser-reload');
	});
	
	chokidar.watch('./frontend/**/*.js').on('all', function(event, path) {
		console.log(event, path);
		runSequence('scripts:copy', 'browser-reload');
	});
	
	chokidar.watch('./frontend/common/svg-icons/*.svg').on('all', function(event, path) {
		console.log(event, path);
		runSequence('svg:build', 'browser-reload');
	});
	
	chokidar.watch('./frontend/**/*.html').on('all', function(event, path) {
		console.log(event, path);
		runSequence('html:copy', 'browser-reload');
	});
	chokidar.watch('./frontend/**/*.jade').on('all', function(event, path) {
		console.log(event, path);
		runSequence('jade:build', 'browser-reload');
	});
	
	chokidar.watch('./frontend/resources/**/*.*').on('all', function(event, path) {
		console.log(event, path);
		runSequence('resources:copy', 'browser-reload');
	});
});


/* HTML */

gulp.task('html:copy', function() {
	return new Promise( function(resolve, reject) {
		gulp.src('./frontend/blocks/pages/**/*.html')
			.pipe(gulp.dest(destFolder))
			.on('end', resolve);
	});
});
gulp.task('jade:build', function() {
	return new Promise(function(resolve, reject) {
		gulp.src('./frontend/blocks/pages/**/*.jade')
			.pipe(jade({pretty: true}))
			.pipe(gulpIf(!DEV, htmlMin({collapseWhitespace: true})))
			.pipe(rename({dirname: ""}))
			.pipe(gulp.dest(destFolder))
			.on('end', resolve);
	});
});


/* STYLES */

gulp.task('css:copy', function() {
	return new Promise(function(resolve, reject) {
		gulp.src('./frontend/common/styles/*.css')
			.pipe(gulp.dest(path.join(destFolder,'css')))
			.on('end', resolve);
	});
});
gulp.task('scss:build', function() {
	return new Promise(function(resolve, reject) {
		
		gulp.src('./frontend/common/styles/*.scss')
			.pipe(preproc({
				'scss': { outputStyle: 'expanded' },
				'less': {},
				'stylus': {}
			}))
			.pipe(autoprefixer({browsers: ['last 3 versions']}))
			.pipe(gulp.dest(path.join(destFolder,'css')))
			.on('end', resolve);
	});
});


/* SCRIPTS */

gulp.task('scripts:copy', function() {
	return new Promise(function(resolve, reject) {
		gulp.src('./frontend/common/scripts/*.js')
		gulp.src('./frontend/common/scripts/**/*.js')
			.pipe(gulp.dest(path.join(destFolder,'js')))
			.on('end', resolve);
	});
});


/* SVG */

gulp.task('svg:build', function() {
	
	return new Promise( function (resolve, reject) {
		gulp.src('./frontend/common/svg-icons/*.svg')
			.pipe(cheerio({
				run: function ($) {
					$('[fill]').removeAttr('fill');
					$('[style]').removeAttr('style');
					$('title').remove();
					$('style').remove();
				},
				parserOptions: { xmlMode: true }
			}))
			.pipe(svgSprites({
				mode: "symbols",
				preview: false,
				svg: {
					sprite: "icons.svg"
				}
			}))
			.pipe(rename('svg-sprite.svg'))
			.pipe(gulp.dest(path.join(destFolder, 'images', 'svg')))
			.on('end', resolve);
	});
});


/* RESOURCES */

gulp.task('resources:copy', function() {
	return new Promise(function(resolve, reject) {
		gulp.src('./frontend/resources/**/*.*')
			.pipe(gulp.dest(destFolder))
			.on('end', resolve);
	});
});

gulp.task('default', ['clean'], function() {
	runSequence('clean', 'html:copy', 'jade:build', 'css:copy', 'scss:build', 'svg:build', 'scripts:copy', 'resources:copy', 'server', 'browser-sync', 'watch');
});