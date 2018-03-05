var gulp        = require('gulp');
var prompt      = require('gulp-prompt');
var inject      = require('gulp-inject');
var fs          = require('fs');


// inject html file to index html content section
gulp.task('inject-to-index', function(){
  var getIndexHTML = fs.readFileSync('./build/prod/docs/prepare/index.html', 'utf8');

  return gulp.src(['./build/prod/docs/prepare/index.html'])
    .pipe( prompt.prompt({
        type:'list',
        name:'inject',
        message:'What would you like to inject to html index file?',
        choices: ['all','separate']
    }, (res) => {
        if(res.inject == 'all'){
        	console.log('all');
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
        }
        else{
        	console.log('separate');
        	return gulp.src(['./build/prod/docs/prepare/index.html'])
            	.pipe(inject(gulp.src(['./build/prod/prepare/separate/test.html']), {
			         starttag: '<!-- inject:test:html -->',
			         transform: function(filepath, file) {
			           return file.contents.toString();
			         }
			      }))
			    .pipe(gulp.dest('./build/prod/docs/prepare/'));
        }
    }));
});
