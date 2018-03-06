var gulp        = require('gulp');
var inject      = require('gulp-inject');
var fs          = require('fs');


// generate side navigation menu using list of files in prepare folder
gulp.task('generate-menu', function(){
  var menuList = '';

  // get all filenames from folder and add to menu list
  fs.readdirSync('./build/prod/prepare/all/').forEach(file => {
    var filename = file.split('.');
    filename = filename[0];
    menuList += '<li class="c2g-chapter-title">'+filename+'</li>';
  });

  // inject menu to predefined template
  return gulp.src(['./doc-template/menu.html'])
    .pipe(inject(gulp.src(['./doc-template/menu.html']), {
      starttag: '<!-- inject:menu:html -->',
      transform: function(filepath, file) {
        return menuList.toString();
     }
  }))
  .pipe(gulp.dest('./build/prod/docs/prepare/menu/'));
});
