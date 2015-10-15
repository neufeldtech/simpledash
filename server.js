//importing modules
var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors')
var exec = require('child_process').exec;
var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
    console.log('connected to redis');
});

var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

//url = "http://skipthedecisions.ml"
app.get('/query', function(req, res){
  client.exists(req.query.url, function(err, reply) {
    if (err){
      res.json({status: 'error', message: 'redis connectivity error'})
    } else {
      if (reply === 1) {
        client.get(req.query.url, function(err, reply){
          if (err) {
            res.json({status: 'error', message: 'redis connectivity error'})
          } else {
            res.json({status: reply})
          }//end no errors, so we'll return the redis value
        })//end get redis key because it DOES exist
      } else {
          res.json({status: 'error', message: 'url not found'})
      } //end else, key does not exist
    } //end else, we didn't get an error checking for redis key
  });


});

app.listen('8080');
console.log('Magic happens on port 8080');
exports = module.exports = app;
