var express = require('express');
var http = require('http');
var mkdocs = require('./mkdocs.js');
var async = require('async');
var app = express();
app.set('port', 1377);

app.get('/builddocs', function(req, res, next) {
  var username = req.query.username || "anonymous";
  var writepath = "../../public/docs/" + username + "_" + Date.now().toString();
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
      mkdocs.mvdocs("site", writepath, function (err) {
        if(err) {
          return callback(res.status(500).json({ msg: "Couldn't move docs." }))
        } else {
          res.status(200).json({ msg: "See your docs at docs/release-note-test" })
          callback()
        }
     })
  }], function (err) {
        if (err) {
          //Handle the error in some way. Here we simply throw it
          //Other options: pass it on to an outer callback, log it etc.
          throw err;
       }
       console.log('Error!');
  });
  next()
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
