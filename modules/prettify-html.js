var fs          = require('fs');
var gulp        = require('gulp');
var htmlmin     = require('gulp-htmlmin');

gulp.task('prettify-html', function(){
  var getIndexHTML = fs.readFileSync('./build/prod/docs/prepare/index.html', 'utf8');
  getIndexHTML = getIndexHTML.replace(/<!-- inject:menu-list:html -->([\w\W]*?)<!-- endinject -->/gm, '$1');
  getIndexHTML = getIndexHTML.replace(/<!-- inject:[^>]* -->([\w\W]*)<!-- endinject -->/gm, '$1');
  getIndexHTML = getIndexHTML.replace(/<!-- inject:[^>]*? -->([\w\W]*?)<!-- endinject -->/gm, '$1');
  getIndexHTML = getIndexHTML.replace(/^\s*\n/gm, '');

  fs.writeFile('./build/prod/docs/prepare/index.html', getIndexHTML, 'utf8', function (err) {
    if (err) {
      console.log('Problem with writing to file!');
      console.log(err);
    }
  });


  return gulp.src(['./build/prod/docs/prepare/index.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build/prod/docs/'));
  console.log('prettify html DONE!');
});
