/*
const
     fs = require('fs'),
     process = require('child_process');

for(var i=0; i<10; i++) {
	var ls = process.exec('node worker.js '+i, function (error, stdout, stderr) {
	   if (error) {
	     console.log(error.stack);
	     console.log('Error code: '+error.code);
	     console.log('Signal received: '+error.signal);
	   }
	   console.log('stdout: ' + stdout);
	   console.log('stderr: ' + stderr);

	 });

	 ls.on('exit', function (code) {
	   console.log('Child process exited with exit code '+code);
	 });
}
*/
var urls = [ "http://origin-prod.www.nfl.com","http://www.schmoggle.google.ca","http://www.ebay.com","http://www.skipthedecisions.ml", "http://www.brandonsun.com","http://www.brandonsun2.com"]
console.log('hey there!');

for(var i=0; i < urls.length ;i++) {
  var exec = require('child_process').exec;
  var processCommand = 'nodejs worker.js '+urls[i]+' 8000';
  console.log('FIRING: '+processCommand);
  exec(processCommand, function(error, stdout, stderr) {
    var json = JSON.parse(stdout.trim());
      console.log(json);
      //console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error);
      }
  });
}
