var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	flash = require('connect-flash'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	configDB = require('./config/database.js');

var app = express(),
	port = process.env.PORT || 8888;

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(session({secret: 'JohDixaewi2aeNgei9OotheeQuaiv5liezoe3Di9aiwah2wei8'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Server started on port ' + port);