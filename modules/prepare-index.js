var gulp        = require('gulp');


gulp.task('prepare-index', function(){
return gulp.src(['./doc-template/index.html'])
  .pipe(gulp.dest('./build/prod/docs/prepare/'));
});
