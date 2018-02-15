var gulp 		= require('gulp'); 
var prompt      = require('gulp-prompt');
var fs          = require('fs'); 

var output = '[]';
gulp.task('create-config', function(){
	if (!fs.existsSync('./config.json')) {
	  	fs.writeFile('./config.json', output, 'utf8', function (err) {
			if (err) {
			    return console.log(err);
			}
			console.log('Config created!');
		}); 
	}else{
		console.log('Config already exist! Step skipped.');
		process.exit();
	}
}); 	

