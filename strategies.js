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
		models.User.findOne({
			where: {
				providerId: profile.id
			}
		})
			.then(user => {
				if (user) {
					let token = jwt.sign(
						{
							id: user.dataValues.id,
							UserRoleId: user.dataValues.UserRoleId
						},
						'newday'
					);
					done(null, token);
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
									let token = jwt.sign(
										{
											id: user.dataValues.id,
											UserRoleId: user.dataValues.UserRoleId
										},
										'newday'
									);
									done(null, token);
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

module.exports = strategies;
