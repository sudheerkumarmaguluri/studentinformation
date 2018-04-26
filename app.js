var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan')
var multer = require('multer');
var bodyParser=require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var  mongoose=require('mongoose')
var cors = require('cors')

var app = express();
app.use(cors())

mongoose.connect('mongodb://sudheermaguluri:M.s9640616462@ds125469.mlab.com:25469/mydb', function (err, db) {
  if (db)
    console.log("connected")
  else
    console.log("not")
});
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://sudheermaguluri:M.s9640616462@ds125469.mlab.com:25469/mydb")

// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
