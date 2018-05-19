const bcrypt = require('bcrypt');

const validator = require('validator');
const models = require('../../../models');

const validate = (req, res, next) => {
	try {
		let userId = req.token.id;
		let { email, password, newPassword } = req.body;
		if (email && !validator.isEmail(email + '')) {
			throw new Error('Email is not valid.');
		}

		if (newPassword && newPassword.length < 6) {
			throw new Error('Password has to be at least 6 characters long.');
		}

		models.User.findById(userId)
			.then(user => {
				if (user) {
					if (password && bcrypt.compareSync(password, user.password)) {
						next();
					} else {
						res.status(422).json({
							error: 'Incorrect password.'
						});
					}
				} else {
					res.status(404).json({
						error: 'User not found.'
					});
				}
			})
			.catch(err => {
				res.status(500).json({
					error: 'Error ocurred while updating user account.'
				});
			});
	} catch (err) {
		res.status(422).json({
			error: err.message
		});
	}
};

module.exports = validate;
