const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const validate = require('./validation');
const models = require('../../../models');
const { createUserToken } = require('../utils');

router.get('/', function(req, res) {
	let id = req.token.id;
	models.User.scope('basic')
		.findById(id, {
			include: [{ all: true }]
		})
		.then(user => {
			if (user) {
				res.status(200).json({
					data: user
				});
			} else {
				res.status(404).json({
					error: 'User not found.'
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				error: err.message || 'Unknown server error.'
			});
		});
});

// Route for refreshing tokens
router.get('/refresh', (req, res) => {
	let userId = req.token.id;
	if (req.token.refreshToken) {
		models.User.findById(userId)
			.then(user => {
				if (user) {
					if (user.updatedAt > new Date(req.token.iat)) {
						res.status(401).json({
							error: 'Refresh token has expired.'
						});
					} else {
						res.status(200).json(createUserToken(user));
					}
				} else {
					res.status(404).json({
						error: 'User not found.'
					});
				}
			})
			.catch(err => {
				res.status(500).json({
					error: err.message
				});
			});
	} else {
		res.status(422).json({
			error: 'Invalid refresh token sent.'
		});
	}
});

router.patch('/', validate, (req, res) => {
	let userId = req.token.id;
	let values = req.body;
	let password = bcrypt.hashSync(values.newPassword || values.password, 10);
	let valuesToUpdate = Object.assign({}, req.body, {
		password
	});
	models.User.update(valuesToUpdate, {
		where: {
			id: userId
		},
		fields: ['email', 'password']
	})
		.then(() => {
			res.status(200).json({
				message: 'User account updated successfully.'
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err.message || 'Error occured while updating user account.'
			});
		});
});

router.delete('/', (req, res) => {
	let userId = req.token.id;
	models.User.destroy({
		where: {
			id: userId
		}
	})
		.then(response => {
			if (response) {
				res.status(200).json({
					message: 'User deleted successfully'
				});
			} else {
				res.status(404).json({
					error: 'User not found.'
				});
			}
		})
		.catch(err =>
			res.status(500).json({
				error: err.message || 'Error occurred while deleting a user.'
			})
		);
});

module.exports = router;
