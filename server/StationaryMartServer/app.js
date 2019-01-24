var express = require('express');
var path = require('path');

var orderRouter = require('./routes/order');
var stationaryRouter = require('./routes/stationary');
var userRouter = require('./routes/user');
var cartRouter = require('./routes/cart');
var adminRouter = require('./routes/admin');

var app = express();

// Mongoose import
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','http://localhost:4200');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect('mongodb://localhost:27017/stationaryMart', function (error) {
    if (error) {
        console.log(error);
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/order', orderRouter);
app.use('/stationary', stationaryRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);

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

// Start the server
app.listen(8989);
console.log('Station mart server is running on port : 8989')