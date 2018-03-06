var fs          = require('fs');
var gulp        = require('gulp');
var htmlmin     = require('gulp-htmlmin');


// prettify html
gulp.task('prettify-html', function(){
  // get prepared index template
  var getIndexHTML = fs.readFileSync('./build/prod/docs/prepare/index.html', 'utf8');

  // replace unnecessary comments
  getIndexHTML = getIndexHTML.replace(/<!-- inject:menu-list:html -->([\w\W]*?)<!-- endinject -->/gm, '$1');
  getIndexHTML = getIndexHTML.replace(/<!-- inject:[^>]* -->([\w\W]*)<!-- endinject -->/gm, '$1');
  getIndexHTML = getIndexHTML.replace(/<!-- inject:[^>]*? -->([\w\W]*?)<!-- endinject -->/gm, '$1');
  getIndexHTML = getIndexHTML.replace(/^\s*\n/gm, '');

  // write replaced parts to index
  fs.writeFile('./build/prod/docs/prepare/index.html', getIndexHTML, 'utf8', function (err) {
    if (err) {
      console.log('Problem with writing to file!');
      console.log(err);
    }
  });

  // finish the task
  return gulp.src(['./build/prod/docs/prepare/index.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build/prod/docs/'));
});
