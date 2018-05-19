const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const models = require('../../../models');

let credentials;

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
	credentials = require('../../../config/auth.json');
}

let strategies = {};

function createUserToken(user) {
	let accessToken = jwt.sign(
		{
			id: user.dataValues.id,
			UserRoleId: user.dataValues.UserRoleId
		},
		'newday',
		{
			expiresIn: 60 * 60 * 24 * 90
		}
	);

	let refreshToken = jwt.sign(
		{
			id: user.dataValues.id,
			UserRoleId: user.dataValues.UserRoleId
		},
		'refresh',
		{
			expiresIn: 60 * 60 * 24 * 90
		}
	);

	return {
		accessToken,
		refreshToken
	};
}

strategies.fb = new FacebookTokenStrategy(
	{
		clientID: credentials.facebook.app_id,
		clientSecret: credentials.facebook.app_secret,
		profileFields: ['gender', 'name', 'email']
	},
	function (accessToken, refreshToken, profile, done) {
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
						UserRoleId: 1,
						UserDetail: {
							firstName: profile.name.givenName,
							lastName: profile.name.familyName
						}
					}, {
						include: [models.UserDetail]
					})
						.then(user => {
							done(null, createUserToken(user));
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
	function (req, accessToken, refreshToken, profile, done) {
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
						UserRoleId: 1,
						UserDetail: {
							firstName: profile.name.givenName,
							lastName: profile.name.familyName
						}
					}, {
						include: [models.UserDetail]
					})
						.then(user => {
							done(null, createUserToken(user));
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
	function (email, password, done) {

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
						done(new Error('Password is incorrect.'));
					}
				} else {
					done(new Error('Wrong email or password.'));
				}
			})
			.catch(err => done(err));

	}
);

strategies.localSignup = new LocalStrategy(
	{
		usernameField: 'email',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		if (req.body.firstName && email && password) {
			models.User.findOne({
				where: {
					email: email
				}
			})
				.then(user => {
					if (user) {
						done(new Error('That email is already in use.'));
					} else {
						if (password.length >= 6) {
							models.User.create({
								provider: 'local',
								email: email,
								UserRoleId: 1,
								password: bcrypt.hashSync(password, 10),
								UserDetail: {
									firstName: req.body.firstName,
									lastName: req.body.lastName,
									nickname: req.body.nickname
								}
							}, {
								include: [models.UserDetail]
							})
								.then(user => {
									done(null, createUserToken(user));
								})
								.catch(err => done(err));
						}
						else {
							done(new Error('Password has to be at least 6 characters long.'));
						}
					}
				})
				.catch(err => done(err));
		}
		else {
			done(new Error('First name, email and password are required.'));
		}
	}
);

module.exports = strategies;
