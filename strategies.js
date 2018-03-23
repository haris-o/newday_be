var LocalStrategy = require('passport-local').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var GooglePlusTokenStrategy = require('passport-google-plus-token');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var models = require('./models');

var credentials;

if (process.env.NODE_ENV === 'production') {
	credentials = {
		facebook: {
			app_id: process.env.FB_ID,
			app_secret: process.env.FB_SECRET
		},
		google: {
			app_id: process.env.GOOGLE_ID,
			app_secret: process.env.GOOGLE_SECRET
		}
	};
} else {
	credentials = require('./config/auth.json');
}

var strategies = {};

function createUserToken(user){
	return jwt.sign(
		{
			id: user.dataValues.id,
			UserRoleId: user.dataValues.UserRoleId
		},
		'newday',
		{
			expiresIn: 60 * 60 * 24 * 90
		}
	)
}

strategies.fb = new FacebookTokenStrategy(
	{
		clientID: credentials.facebook.app_id,
		clientSecret: credentials.facebook.app_secret,
		profileFields: ['gender', 'name', 'email']
	},
	function(accessToken, refreshToken, profile, done) {
		models.User.findOne({
			where: {
				providerId: profile.id
			}
		})
			.then(user => {
				if (user) {
					done(null, createUserToken(user));
				} else {
					models.User.create({
						provider: 'facebook',
						providerId: profile.id,
						email: profile.emails[0].value || null,
						UserRoleId: 1
					})
						.then(user => {
							user
								.createUserDetail({
									firstName: profile.name.givenName,
									lastName: profile.name.familyName,
									isFemale: profile.gender !== 'male'
								})
								.then(detail => {
									done(null, createUserToken(user));
								});
						})
						.catch(err => done(err));
				}
			})
			.catch(err => {
				done(err);
			});
	}
);

strategies.google = new GooglePlusTokenStrategy(
	{
		clientID: credentials.google.app_id,
		clientSecret: credentials.google.app_secret,
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		models.User.findOne({
			where: {
				providerId: profile.id
			}
		})
			.then(user => {
				if (user) {
					done(null, createUserToken(user));
				} else {
					models.User.create({
						provider: 'google',
						providerId: profile.id,
						email: profile.emails[0].value || null,
						UserRoleId: 1
					})
						.then(user => {
							user
								.createUserDetail({
									firstName: profile.name.givenName,
									lastName: profile.name.familyName,
									isFemale: profile.gender !== 'male'
								})
								.then(detail => {
									done(null, createUserToken(user));
								});
						})
						.catch(err => done(err));
				}
			})
			.catch(err => {
				done(err);
			});
	}
);

strategies.localLogin = new LocalStrategy(
	{
		usernameField: 'email'
	},
	function(email, password, done) {
		models.User.findOne({
			where: {
				email: email
			}
		})
			.then(user => {
				if (user) {
					if (bcrypt.compareSync(password, user.password)) {
						done(null, createUserToken(user));
					} else {
						done(null, false);
					}
				} else {
					done(null, false);
				}
			})
			.catch(err => done(err));
	}
);

strategies.localSignup = new LocalStrategy(
	{
		usernameField: 'email'
	},
	function(email, password, done) {
		models.User.findOne({
			where: {
				email: email
			}
		})
			.then(user => {
				if (user) {
					done(null, false);
				} else {
					models.User.create({
						provider: 'local',
						email: email,
						UserRoleId: 1,
						password: bcrypt.hashSync(password, 10)
					})
						.then(user => {
							done(null, createUserToken(user));
						})
						.catch(err => done(err));
				}
			})
			.catch(err => done(err));
	}
);

module.exports = strategies;
