//////////////////////////////////////////////
//////////////////////////////////////////////
////                                      ////
////         css-to-guidelines            ////
////                                      ////
//////////////////////////////////////////////
//////////////////////////////////////////////
////                                      ////
////  Author  : Ján Baško                 ////
////  Email   : basko.jan@gmail.com       ////
////  Version : beta                      ////
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


// live reload task
// http://localhost:8080
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});  


// compress and minify css 
// import.scss -> style.css -> style.min.css
gulp.task('sass-to-css', function () {
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
  gulp.watch(['./scss/*.scss'], ['sass']);
  gulp.watch(['./scss/*/*.scss'], ['sass']);
  gulp.watch(['./build/prod/css/style.min.css'], ['sass']);
});


gulp.task('default', ['connect']);