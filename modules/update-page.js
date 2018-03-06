var gulp        = require('gulp');
var prompt      = require('gulp-prompt');
var fs          = require('fs');
var rename 	    = require('gulp-rename');


gulp.task('update-config', function(){
  var getConfig;
  var output;
  var pushArray = [];
  var i;
  var preparePush;

  // push page names to a new array
  var getConfig = JSON.parse(fs.readFileSync('./config.json'));
  for (i = 0; i < getConfig.length; i++) {
    pushArray.push(getConfig[i].pageName);
  }

	// check if config exist
	if (fs.existsSync('./config.json')) {
		// check if array of pages is empty or not
		if (pushArray.length !== 0) {

			// select page to rename
			return gulp.src(['./config.json'])
			.pipe(prompt.prompt({
		        type: 'list',
		        name: 'rename',
		        message: 'Which page you would like to rename?',
		        choices: pushArray
		    }, function(response){

		    	// rename page from original file by index
	        	return gulp.src(['./config.json'])
	        	.pipe(prompt.prompt({
			        type: 'input',
			        name: 'update',
			        message: 'Type the new page:'
			    }, function(res){
			    	preparePush = {
						"pageName" : res.update,
						"hasChild" : false,
						"child": []
		  			}
			       	var indexItem = getConfig.findIndex(x => x.pageName == response.rename);
					getConfig.splice(indexItem, 1, preparePush);

					// set a new output file for config
					output = JSON.stringify(getConfig);
					// rewrite config file
			        fs.writeFile('./config.json', output, 'utf8', function (err) {
					    if (err) {
					        console.log('Problem with writing to config file!');
					        console.log(err);
					    }
						console.log('Config updated!');
					});
				}));
		    }));
	    }
		else{
			console.log('Hmm interesting, it seems that you don\'t have created any of pages yet :( ');
			console.log('Try to run following: gulp create-page');
			process.exit();

		}
	} else{
		console.log('Config file not exist! Please run: gulp start');
		process.exit();
	}
});
