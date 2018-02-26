var gulp        = require('gulp');
var replace     = require('gulp-replace');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');

gulp.task('all-scss-to-html', function(){
  return gulp.src(['./scss/styles/*'])
    .pipe(replace('* ', '')) 
    .pipe(replace('/*', '')) 
    .pipe(replace('*/', '')) 
    // .pipe(replace('//[start]', '◣'))
    // .pipe(replace('//[end]', '◣'))
    .pipe(replace('[title]', '◢'))
    .pipe(replace('[/title]', '◢'))
    .pipe(replace('[comment]', '▶'))
    .pipe(replace('[/comment]', '▶'))
    .pipe(replace('{code}', '⸨'))
    .pipe(replace('{/code}', '⸩'))
    .pipe(replace('[preview]', '▲'))
    .pipe(replace('[/preview]', '▲'))  
    .pipe(replace('//[css]', '▼'))
    .pipe(replace('//[/css]', '▼'))
    .pipe(rename({extname: '.html'})) 
    .pipe(gulp.dest('build/prod/prepare/all/'));
}); 