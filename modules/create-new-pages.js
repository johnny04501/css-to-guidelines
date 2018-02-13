var gulp        = require('gulp');
var prompt      = require('gulp-prompt');
var fs          = require('fs'); 
var rename 	    = require('gulp-rename');

var getConfig = JSON.parse(fs.readFileSync('./config.json')); 
var preparePush;
var output;

gulp.task('update-config', function(){
  return gulp.src(['./config.json'])
    .pipe(prompt.prompt({
        type: 'input',
        name: 'task',
        message: 'Name for your page:'
    }, function(res){
    	// prepare object for push to config json file
        var preparePush = {
			"pageName" : res.task,
			"hasChild" : false,
			"child"	   : []
		};
		// push to config json
        getConfig.push(preparePush); 
        // stringify before final write to config json 
        output = JSON.stringify(getConfig);

        // write to config file
        fs.writeFile('./config.json', output, 'utf8', function (err) {
		    if (err) {
		        return console.log(err);
		    }
			console.log('Config updated!');
		}); 
    }));
}); 