//////////////////////////////////////////////
//////////////////////////////////////////////
////                                      ////
////         css-to-guidelines            ////
////                                      ////
//////////////////////////////////////////////
//////////////////////////////////////////////
////                                      ////
////    Author  : Ján Baško               ////
////    Email   : basko.jan@gmail.com     ////
////                                      ////
//////////////////////////////////////////////
//////////////////////////////////////////////

'use strict';

// require modules
var gulp 		    = require('gulp');
var connect     = require('gulp-connect');
var sass 	      = require('gulp-sass');
var rename 	    = require('gulp-rename');
var cssmin      = require('gulp-cssmin');
var replace     = require('gulp-replace');
var requireDir 	= require('require-dir');
var inject      = require('gulp-inject');
var sequence    = require('gulp-sequence');
var prompt      = require('gulp-prompt');
var fs          = require('fs');
var sequence    = require('gulp-sequence');
var htmlmin     = require('gulp-htmlmin');

// custom modules
var dir = requireDir('./modules/');

// live reload task
// http://localhost:8080
gulp.task('connect', function() {
    connect.server({
      livereload: true,
      directoryListing: true
    });
});


// console.log(getIndexHTML);

// import.scss -> guideline-template.css -> guideline-template.min.css
gulp.task('prettify-docs-css', function () {
  return gulp.src('./doc-template/scss/import.scss')
  	.pipe(sass({outputStyle: 'compressed'}))
  	.pipe(rename('guideline-template.css'))
  	.pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/prod/docs/css/'))
    .pipe(connect.reload());
});

// compress and minify css
// import.scss -> style.css -> style.min.css
gulp.task('scss-to-css', function () {
  return gulp.src('./scss/import.scss')
  	.pipe(sass({outputStyle: 'compressed'}))
  	.pipe(rename('style.css'))
  	.pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/prod/css/'))
    .pipe(connect.reload());
});

// watch task
gulp.task('watch', function () {
  gulp.watch(['./scss/*.scss'], ['scss-to-css']);
  gulp.watch(['./scss/*/*.scss'], ['scss-to-css']);
  gulp.watch(['./build/prod/css/style.min.css'], ['scss-to-css']);
  gulp.watch(['./doc-template/scss/export-scss/*.scss'], ['prettify-docs-css']);
});


gulp.task('default', ['connect', 'watch']);
gulp.task('start', ['create-config']);
gulp.task('create-page', ['add-to-config']);
gulp.task('remove-page', ['rm-from-config']);
gulp.task('update-page', ['update-config']);
gulp.task('create-docs', function(done) {
  sequence('scss-to-css', ['all-scss-to-html'], 'inject-to-section', ['inject-to-index'],'prettify-docs-css', done);
});
