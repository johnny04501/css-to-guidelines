var gulp        = require('gulp');
var inject      = require('gulp-inject');
var fs          = require('fs');


// inject html file to index html content section
gulp.task('inject-to-index', function(){
  // inject menu template and all sections to index
  return gulp.src(['./build/prod/docs/prepare/index.html'])
    .pipe(inject(gulp.src(['./build/prod/docs/prepare/menu/menu.html']), {
      starttag: '<!-- inject:menu-list:html -->',
      transform: function(filepath, file) {
        return file.contents.toString();
     }
    }))
    .pipe(inject(gulp.src(['./build/prod/docs/prepare/all/*.html']), {
      starttag: '<!-- inject:all:html -->',
      transform: function(filepath, file) {
        return file.contents.toString();
      }
    }))
    .pipe(gulp.dest('./build/prod/docs/prepare/'));
});
