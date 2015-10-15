var request = require('request');

//var url = process.argv[2];

//console.log(process.argv[2]);

request.get(process.argv[2],{timeout: process.argv[3]}, function(err, response, data){
  //console.log("url: "+process.argv[2]+" timeout: "+process.argv[3]);

  if(!err && response.statusCode == 200){
    var string = { "status" : "ok" } ;
    //parsedData = JSON.parse(string);
    outputJSON = JSON.stringify(string);
    console.log(outputJSON);
  } else {
    var string = {"status" : "error", "message": err}
    outputJSON = JSON.stringify(string)
    console.log(outputJSON);
  }

  //console.log(data);
});
