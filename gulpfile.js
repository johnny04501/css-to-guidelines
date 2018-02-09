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
var replace     = require('gulp-replace'); 


// live reload task
// http://localhost:8080
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
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


gulp.task('scss-to-html', function(){
  return gulp.src(['./scss/sample-font.scss'])
    .pipe(replace('* ', '')) 
    .pipe(rename('test.html')) 
    .pipe(gulp.dest('build/'));
    console.log('done templates');
}); 


// watch task
gulp.task('watch', function () {
  gulp.watch(['./scss/*.scss'], ['scss-to-css']);
  gulp.watch(['./scss/*/*.scss'], ['scss-to-css']);
  gulp.watch(['./build/prod/css/style.min.css'], ['scss-to-css']);
});


gulp.task('default', ['connect']);