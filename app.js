var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var questions    = require('./routes/questions');
var providers    = require('./routes/providers');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
  maxAge: 3600000, // Preserve session for just 1h
  secret: 'awesome lobstah'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', questions);
app.use('/questions', questions);
app.use('/providers', providers);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler (will print stacktrace)
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });
}

// Production error handler (no stacktraces leaked to user)
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: {} });
});

module.exports = app;
