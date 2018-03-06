var gulp 		    = require('gulp');
var prompt      = require('gulp-prompt');
var fs          = require('fs');

// create config file for future using
var output = '[]';
gulp.task('create-config', function(){
	if (!fs.existsSync('./config.json')) {
	  	fs.writeFile('./config.json', output, 'utf8', function (err) {
			if (err) {
			    console.log('Problem with writing to config file!');
			    console.log(err);
			}
			console.log('Config created!');
		});
	}else{
		console.log('Config already exist! Step skipped.');
		process.exit();
	}
});

