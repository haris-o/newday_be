var FacebookTokenStrategy = require('passport-facebook-token');
var jwt = require('jsonwebtoken');

var credentials = require('./config/auth.json');
var models = require('./models');

var strategies = {};

strategies.fb = new FacebookTokenStrategy(
	{
		clientID: credentials.facebook.app_id,
		clientSecret: credentials.facebook.app_secret,
		profileFields: ['gender', 'name', 'email']
	},
	function(accessToken, refreshToken, profile, done) {
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
);

module.exports = strategies;
