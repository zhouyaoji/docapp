var express = require('express');
var webservice_router = express.Router();
var mkdocs = require('../helpers/mkdocs.js');


/* GET home page. */
webservice_router.get('/builddocs', function(req, res, next) {
  var ret_val = mkdocs.builddocs('release-note-test');
  console.log("Calling web service.")
  if(ret_val) {
    res.json({ status: "ERROR", msg: "Couldn't build docs." })
  }
  var ret_val = mkdocs.copydocs("./release-note-test", "../public/docs")
  if(ret_val) {
    res.json({ ERROR: "Couldn't build docs." })
  }
  res.json({ status: "SUCCESS", msg: "See your docs at docs/release-note-test" })
  next();
});

module.exports = webservice_router;
