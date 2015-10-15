//This is the workerbee process that takes commands from master.js
var request = require('request');

request.get(process.argv[2],{timeout: process.argv[3]}, function(err, response, data){
  if(!err && response.statusCode == 200){
    var string = { "status" : "ok", "uri": process.argv[2] } ;
    //parsedData = JSON.parse(string);
    outputJSON = JSON.stringify(string);
    console.log(outputJSON);
  } else {
    var string = {"status" : "error", "uri": process.argv[2], "message": err}
    outputJSON = JSON.stringify(string)
    console.log(outputJSON);
  }
});
