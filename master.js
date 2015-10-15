//this master.js file puts worker.js to work, then saves results in redis.
var exec = require('child_process').exec;
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
    console.log('connected to redis');
});

var urls = ['http://brandonsun.com','http://brandonsun2.com','http://classifieds.brandonsun.com','http://brandonsunsells.com','http://brandonsun.can.newsmemory.com']
function checkSites(urls) {
  for(var i=0; i < urls.length ;i++) {
    var processCommand = 'nodejs worker.js '+urls[i]+' 8000';
    console.log('FIRING: '+processCommand);
    exec(processCommand, function(error, stdout, stderr) {
      var json = JSON.parse(stdout.trim());
      console.log(json);
      client.set(json.uri, json.status);
        //console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error);
          client.set(json.uri, json.status)
      }
    });
  }
}
var maximumInterval = (10 * urls.length) / 2;

var seconds = maximumInterval, the_interval = seconds * 1000;
setInterval(function() {
  console.log("I am doing my "+maximumInterval+" second scrape");
  checkSites(urls);
}, the_interval);

//kick it off
checkSites(urls);
