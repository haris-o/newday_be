var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport'),
	FacebookTokenStrategy = require('passport-facebook-token');

var models = require('./models');
var credentials = require(path.join(__dirname, '/config/auth.json'));

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
passport.use(
	new FacebookTokenStrategy(
		{
			clientID: credentials.facebook.app_id,
			clientSecret: credentials.facebook.app_secret,
			profileFields: ['gender', 'name', 'email']
		},
		function(accessToken, refreshToken, profile, done) {
			console.log(profile);
			models.User.findById(profile.id, {
				include: [{ all: true }]
			})
				.then(user => {
					if (!user) {
						models.User.create({
							id: profile.id,
							email: profile.emails[0].value || null,
							token: jwt.sign(profile._json, 'newday'),
							UserRoleId: 1
						})
							.then(user => {
								console.log(user.dataValues);
								user
									.createUserDetail({
										firstName: profile.name.givenName,
										lastName: profile.name.familyName,
										isFemale: profile.gender !== 'male'
									})
									.then(details => {
										user.dataValues.userDetail = details;
										done(null, user.dataValues);
									});
							})
							.catch(err => done(err));
					} else {
						done('Inactive user');
					}
				})
				.catch(err => {
					done(err);
				});
		}
	)
);

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

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
	res.json({
		error: err.message
	});
});

module.exports = app;
