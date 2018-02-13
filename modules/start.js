var gulp 		= require('gulp'); 
var prompt      = require('gulp-prompt');
var file 		= require('gulp-file');
var fs          = require('fs'); 

var output = '[]';

gulp.task('create-config', function(){
  fs.writeFile('./config.json', output, 'utf8', function (err) {
		    if (err) {
		        return console.log(err);
		    }
			console.log('Config created!');
		}); 
}); 