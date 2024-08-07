var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var addressRouter = require('./routes/address.route');
var cartRouter = require('./routes/cart.route');
var billMoreRouter = require('./routes/billmore.route');
var notifyRouter = require('./routes/notify.route');
var notifyControllerRouter = require('./routes/notify.controller.router');


var loginRouter = require('./routes/login');
var productRouter = require('./routes/product');
var billRouter = require('./routes/bill.route');
var ChatRouter = require('./routes/chat.route');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("uploads"));

app.use(express.static("tmp"));
app.use(session({
  secret: '2372347293sdhjfhjksddfssfsdffkjssii', //chuỗi kí tự đặc biệt để session mã hóa, tự viết
  resave: false,
  saveUninitialized: true,
}))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',loginRouter);

app.use('/api',apiRouter);

app.use('/address',addressRouter);
app.use('/cart',cartRouter);
app.use('/billmore',billMoreRouter);
app.use('/notify', notifyRouter);
app.use('/sendNotify', notifyControllerRouter);

app.use('/product',productRouter);
app.use('/bill',billRouter);
app.use('/chat',ChatRouter);


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
