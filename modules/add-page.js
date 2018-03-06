var gulp        = require('gulp');
var prompt      = require('gulp-prompt');
var fs          = require('fs'); 
var rename 	    = require('gulp-rename');

// prepare variables
var getConfig;
var preparePush;
var output; 

gulp.task('add-to-config', function(){
	// check if config exists
	if (fs.existsSync('./config.json')) { 

		// get config data
		var getConfig = JSON.parse(fs.readFileSync('./config.json'));

		// function to create a new page
		function addNewPage(){
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
						"child": []
		  			} 
				// push to config json
		        getConfig.push(preparePush); 

		        // ask if wanna add another page
		        return gulp.src(['./config.json'])
			        .pipe( prompt.prompt({
			            type:'list',
			            name:'add',
			            message:'Would you like to add new page?',
			            choices: ['Yes','No'],
			            pageSize:'3'
			        }, (res) => {
			            if(res.add == 'Yes'){
			            	addNewPage();
			            }else{
		        			// stringify before final write to config json 
			            	output = JSON.stringify(getConfig);
			            	
					        // write to config file
					        fs.writeFile('./config.json', output, 'utf8', function (err) {
							    if (err) { 
							        console.log('Problem with writing to config file!');
							        console.log(err);
							    }
								console.log('Config updated!');
							}); 
			            }
			        }));	        
		    }));		
		}
		addNewPage();
	}else{
			console.log('Config file not exist! Please run: gulp start');		
			process.exit();
		}
});