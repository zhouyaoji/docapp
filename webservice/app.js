var express = require('express');
var http = require('http');
var mkdocs = require('./mkdocs.js');
var async = require('async');
var app = express();
app.set('port', 1377);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/builddocs', function(req, res, next) {
  var username = req.query.username || "anonymous";
  var docpath = "/docs/" + username + "_" + Date.now().toString();
  var path = "../../public" + docpath
  var domain = req.get('host')
  var port = req.get('port')
  async.series([
    function(callback) {  
      mkdocs.builddocs('release-note-test', function (err) {
         if(err) {
              return callback(res.status(500).json({ msg: "Couldn't build docs." }))
         } 
         callback();
      })
    },
    function(callback) {
      mkdocs.mvdocs("site", path, function (err) {
        if(err) {
          return callback(res.status(500).json({ msg: "Couldn't move docs." }))
        } else {
          res.status(200).json({ domain: domain, path: docpath, port: port })
        }
        callback()
     })
    }
  ]);
  next()
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
