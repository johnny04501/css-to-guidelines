var gulp        = require('gulp');
var clean       = require('gulp-clean');

gulp.task('clean-all', function () {
  return gulp.src(['./build/prod/prepare/','./build/prod/docs/prepare/'])
    .pipe(clean())
    .on('end', function(){console.log('Your guideline is ready! You can find it in ./build/docs/');});
  });
