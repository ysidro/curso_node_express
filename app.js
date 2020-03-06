var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fash = require('connect-flash');

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;


var hbs = require('hbs');
var hbsUtils = require('hbs-utils')(hbs);

hbsUtils.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);


var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var users_mysql = require('./routes/users-mysql-routers');
var invoices = require('./routes/invoices');
var middleware_routes = require('./routes/middleware-routes');
var filesystem = require('./routes/filessystem');
var queryString = require('./routes/query-string');
var session_router = require('./routes/user_session');
var session_flash_router = require('./routes/session_flash_router');
var form_validation_routes = require('./routes/form-validation-routes');
var login = require('./routes/login-routes');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '<ug1pbm*{5}ZR>M$Sp}2tj1*!"5NW',
  name: 'super-secret-name',
  resave: true,
  saveUninitialized: true
}));

app.use(fash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  res.locals.user = req.user;
  next();
})

app.use('/components', express.static(`${__dirname}/public/components`));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.all('/invoices/*', (req, res, next) => {
  if (!req.headers['api-key']) {
    res.status(200).json('Api Key is Mandatory');
  }
  next();
})

app.use('/invoices', invoices);
app.use('/middleware-routes', middleware_routes);
app.use('/filesystem', filesystem);
app.use('/query-string', queryString);
app.use('/user_session', session_router);
app.use('/users-mysql', users_mysql);
app.use('/session-flash', session_flash_router);
app.use('/form',form_validation_routes);
app.use('/user-login',login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
