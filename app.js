var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/quandary')
  .then(() =>  console.log('Connected to database!'))
  .catch((err) => console.error(err));

var index = require('./routes/index');
var users = require('./routes/users');
var quandaries = require('./routes/quandaries');

var app = express();

/// View engine setup ///
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/quandaries', quandaries);

/// Catch 404 and forward to error handler ///
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// Error handler ///
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /// Render the error page ///
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/// Express server ///
app.listen(3000, function() {
    console.log("Server listening on port 3000!  Let's talk to it...");
});
