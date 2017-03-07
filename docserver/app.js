var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var webserver_port = 8080
var webserver_app = express();

// view engine setup
webserver_app.set('views', path.join(__dirname, 'views'));
webserver_app.set('view engine', 'pug');

// Settings for the web server
//webserver_app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
webserver_app.use(logger('dev'));
webserver_app.use(bodyParser.json());
webserver_app.use(bodyParser.urlencoded({ extended: false }));
webserver_app.use(cookieParser());


// Set statics paths
webserver_app.use(express.static('../public'))
webserver_app.use(express.static('files'))
webserver_app.use('/docs', express.static(path.join(__dirname, '../public')))


var index = require('./routes/index');
webserver_app.use('/', index);

/*
// catch 404 and forward to error handler
webserver_app.use(function(req, res, next) {
  if (req.url.includes("docs")) {
    next();
  } else {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});
*/
webserver_app.listen(webserver_port, function () {
  console.log('Doc server is listening on port ' + webserver_port)
})

// Settings for web service
// Settings for the web server
//webserver_app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
module.exports = webserver_app;
