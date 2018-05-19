const jwt = require('jsonwebtoken');

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
			UserRoleId: user.dataValues.UserRoleId,
			refreshToken: true
		},
		'newday',
		{}
	);

	return {
		accessToken,
		refreshToken
	};
}

module.exports = {createUserToken};