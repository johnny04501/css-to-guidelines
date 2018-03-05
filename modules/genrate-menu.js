var gulp        = require('gulp');
var inject      = require('gulp-inject');
var fs          = require('fs');


gulp.task('generate-menu', function(){
  var menuList = '';
  fs.readdirSync('./build/prod/prepare/all/').forEach(file => {
    var filename = file.split('.');
    filename = filename[0];
    menuList += '<li class="c2g-chapter-title">'+filename+'</li>';

  });
  return gulp.src(['./doc-template/menu.html'])
    .pipe(inject(gulp.src(['./doc-template/menu.html']), {
      starttag: '<!-- inject:menu:html -->',
      transform: function(filepath, file) {
        return menuList.toString();
     }
  }))
  .pipe(gulp.dest('./build/prod/docs/prepare/menu/'));
});
