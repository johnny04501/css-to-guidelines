var gulp        = require('gulp');
var inject      = require('gulp-inject');
var fs          = require('fs');
var rename      = require('gulp-rename');



gulp.task('inject-to-section', function(){
  fs.readdirSync('./build/prod/prepare/all/').forEach(file => {
    var noPreview = 'hide-element';
    var filename = file.split('.');
    filename = filename[0];
    var getIndexHTML = fs.readFileSync('./build/prod/prepare/all/'+filename+'.html', 'utf8');

    // get heading from file
    var getHeading = getIndexHTML.substring(getIndexHTML.indexOf('◢')+1, getIndexHTML.lastIndexOf('◢'));

    // get comment from file
    var getComment = getIndexHTML.substring(getIndexHTML.indexOf('▶')+1, getIndexHTML.lastIndexOf('▶'));
    getComment = getComment.replace(/[<]/g, '&lt;');
    getComment = getComment.replace(/[>]/g, '&gt;');
    getComment = getComment.replace(/[⸨]/g, '<span>');
    getComment = getComment.replace(/[⸩]/g, '</span>');

    // get preview from file
    var getPreview = getIndexHTML.substring(getIndexHTML.indexOf('▲')+1, getIndexHTML.lastIndexOf('▲'));

    // get css from file
    var getCss = getIndexHTML.substring(getIndexHTML.indexOf('▼')+1, getIndexHTML.lastIndexOf('▼'));

    // replace < > for html snippet
    var getHtml = getPreview;
    getHtml = getHtml.replace(/[<]/g, '&lt;');
    getHtml = getHtml.replace(/[>]/g, '&gt;');


    // inject all parts to predefined page section template
    return gulp.src(['./doc-template/page-section.html'])
      .pipe(inject(gulp.src(['./build/prod/prepare/all/'+filename+'.html']), {
        starttag: '<!-- inject:heading:html -->',
        transform: function(filepath, file) {
          return getHeading.toString('utf8');
        }
      }))
      .pipe(inject(gulp.src(['./build/prod/prepare/all/'+filename+'.html']), {
        starttag: '<!-- inject:comment:html -->',
        transform: function(filepath, file) {
          return getComment.toString('utf8');
        }
      }))
      .pipe(inject(gulp.src(['./build/prod/prepare/all/'+filename+'.html']), {
        starttag: '<!-- inject:preview:html -->',
        transform: function(preview, file) {
          return getPreview;
        }
      }))
      .pipe(inject(gulp.src(['./build/prod/prepare/all/'+filename+'.html']), {
        starttag: '<!-- inject:codecss:html -->',
        transform: function(filepath, file) {
          if(!getCss || getCss.length <= 0){
            return;
          }
          else{
            return getCss;
          }
        }
      }))
      .pipe(inject(gulp.src(['./build/prod/prepare/all/'+filename+'.html']), {
        starttag: '<!-- inject:codehtml:html -->',
        transform: function(filepath, file) {
          if(!getHtml || getHtml.length <= 0){
            return;
          }
          else{
            return getHtml;
          }
        }
      }))
      .pipe(inject(gulp.src(['./build/prod/prepare/all/'+filename+'.html']), {
        starttag: '<!-- inject:showcodecss:html -->',
        transform: function(filepath, file) {
          if(!getCss || getCss.length <= 0){
            return noPreview;
          }
          else{
            return;
          }
        }
      }))
      .pipe(inject(gulp.src(['./build/prod/prepare/all/'+filename+'.html']), {
        starttag: '<!-- inject:showcodehtml:html -->',
        transform: function(filepath, file) {
          if(!getHtml || getHtml.length <= 0){
            return noPreview;
          }
          else{
            return;
          }
        }
      }))
      .pipe(rename({basename: filename}))
      .pipe(gulp.dest('./build/prod/docs/prepare/all/'));
  });
});
