var express = require('express');
var home_router = express.Router();

/* GET home page. */
home_router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = home_router;
