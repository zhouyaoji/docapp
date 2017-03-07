var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var webserver_port = 80
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
webserver_app.use(express.static(path.join(__dirname, '../public')));


// Set statics paths
webserver_app.use(express.static('public'))
webserver_app.use(express.static('files'))
webserver_app.use('/static', express.static(path.join(__dirname, 'public')))

var index = require('./routes/index');
var users = require('./routes/users');
webserver_app.use('/', index);
webserver_app.use('/users', users);

// catch 404 and forward to error handler
webserver_app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
webserver_app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.webserver_app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

webserver_app.listen(webserver_port, function () {
  console.log('Doc server is listening on port 80!')
})

// Settings for web service
// Settings for the web server
//webserver_app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var webservice_app = express();
webservice_app.use(logger('dev'));
webservice_app.use(bodyParser.json());
webservice_app.use(bodyParser.urlencoded({ extended: false }));
webservice_app.use(cookieParser());
webservice_app.use(express.static(path.join(__dirname, 'public')));


// Set statics paths
webservice_app.use(express.static('public'))
webservice_app.use(express.static('files'))
webservice_app.use('/static', express.static(path.join(__dirname, 'public')))

var webservice_port = 8080
//var builddocs = require('./routes/builddocs');
//webservice_app.use('/builddocs', builddocs);
var home = require('./routes/index');
webservice_app.use('/', home);

// catch 404 and forward to error handler
webservice_app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
webservice_app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.webservice_app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
webservice_app.listen(webservice_port, function () {
  console.log("Web service for building doc is listing on port 8080.")
})

module.exports = webservice_app;
