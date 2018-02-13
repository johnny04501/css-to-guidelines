var gulp        = require('gulp');
var prompt      = require('gulp-prompt');
var inject      = require('gulp-inject');

// inject html file to index html content section
gulp.task('inject-to-index', function(){
  return gulp.src(['./doc-template/index.html'])
    .pipe( prompt.prompt({
        type:'list',
        name:'inject',
        message:'What would you like to inject to html index file?',
        choices: ['all','separate']
    }, (res) => {
        if(res.inject == 'all'){
        	console.log('all');
				return gulp.src(['./doc-template/index.html'])
            	.pipe(inject(gulp.src(['./build/prod/prepare/all/*.html']), {
			         starttag: '<!-- inject:all:html -->',
			         transform: function(filepath, file) {
			           return file.contents.toString();
			         }
			      }))
			    .pipe(gulp.dest('./build/prod/docs/'));
        }
        else{
        	console.log('separate');
        	return gulp.src(['./doc-template/index.html'])
            	.pipe(inject(gulp.src(['./build/prod/prepare/separate/test.html']), {
			         starttag: '<!-- inject:test:html -->',
			         transform: function(filepath, file) {
			           return file.contents.toString();
			         }
			      }))
			    .pipe(gulp.dest('./build/prod/docs/'));
        }
    }));  
});