var gulp        = require('gulp');
var inject      = require('gulp-inject');
var fs          = require('fs');


// inject menu to index template
gulp.task('inject-menu-to-index', function(){
  var getIndexHTML = fs.readFileSync('./build/prod/docs/prepare/menu/menu.html', 'utf8');
  getIndexHTML = getIndexHTML.replace(/<!-- inject:menu:html -->([\w\W]*)<!-- endinject -->/gm, '$1');
  fs.writeFile('./build/prod/docs/prepare/menu/menu.html', getIndexHTML, 'utf8', function (err) {
    if (err) {
      console.log('Problem with writing to file!');
      console.log(err);
    }
  });

  // inject to index template
  return gulp.src(['./doc-template/index.html'])
    .pipe(inject(gulp.src(['./build/prod/docs/prepare/menu/menu.html']), {
      starttag: '<!-- inject:menu-list:html -->',
      transform: function(filepath, file) {
        return file.contents.toString();
     }
    }))
    .pipe(gulp.dest('./build/prod/docs/prepare/menu/'));
});
