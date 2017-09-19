const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./routes/index');
// var users = require('./routes/users');
const newDiary = require('./routes/new_diary');
const diary = require('./routes/diary');

var app = express();

// var db = mongoose.connect('mongodb://127.0.0.1:27017/diary', (err) => {
//   if (err) console.error(err);
//   console.log('Database connected.');
// });
var db = mongoose.connect(process.env.MONGODB_ADDON_URI ||
                          'mongodb://127.0.0.1:27017/diary', (err) => {
  if (err) console.error(err);
  console.log('Database connected.');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', index);
// app.use('/users', users);
app.use('/new_diary', newDiary);
app.use('/diary', diary);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
