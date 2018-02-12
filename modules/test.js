var gulp        = require('gulp');
var replace     = require('gulp-replace');
var rename      = require('gulp-rename');

gulp.task('scss-to-html', function(){
  return gulp.src(['./scss/sample-font.scss'])
    .pipe(replace('* ', '')) 
    .pipe(replace('/*', '')) 
    .pipe(replace('*/', '')) 
    .pipe(replace('//[start]', '<div class="guide-section">'))
    .pipe(replace('//[end]', '</div>'))
    .pipe(replace('[title]', '<div class="guide-section-title">'))
    .pipe(replace('[/title]', '</div>'))
    .pipe(replace('[comment]', '<p class="guide-section-comment">'))
    .pipe(replace('[/comment]', '</p>'))
    .pipe(replace('{code}', '<textarea disabled class="code-in-comment">'))
    .pipe(replace('{/code}', '</textarea>'))
    .pipe(replace('{preview}', '<div class="guide-section-preview">'))
    .pipe(replace('{/preview}', '</div>'))    
    .pipe(replace('//[css]', '<pre class="guide-section-code-sample">'))
    .pipe(replace('//[/css]', '</pre>'))
    .pipe(rename('test.html')) 
    .pipe(gulp.dest('build/prod/prepare/'));
}); 