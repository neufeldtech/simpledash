//importing modules
var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors')
var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));

var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

url = "http://skipthedecisions.ml"
app.get('/query', function(req, res){
  request.get(req.query.url,{timeout: req.query.timeout}, function(err, response){
    if(!err && response.statusCode == 200){
      res.json({ 'status': 'ok' });
    } else {
      res.json({ 'status': 'error'});
    }
  });

});


app.listen('8080');
console.log('Magic happens on port 8080');
exports = module.exports = app;
