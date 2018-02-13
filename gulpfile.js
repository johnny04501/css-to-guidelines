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
var gulp 		= require('gulp');
var connect     = require('gulp-connect');
var sass 	    = require('gulp-sass');
var rename 	    = require('gulp-rename');
var cssmin      = require('gulp-cssmin');
var replace     = require('gulp-replace'); 
var requireDir 	= require('require-dir');
var inject      = require('gulp-inject');
var sequence    = require('gulp-sequence');
var prompt      = require('gulp-prompt');
var fs          = require('fs');

// custom modules
var dir = requireDir('./modules/'); 

// live reload task
// http://localhost:8080
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});   


// compress and minify css for doc template 
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
});


gulp.task('default', ['connect']);