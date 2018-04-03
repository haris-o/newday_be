const express = require('express');
const bcrypt = require('bcrypt');

const models = require('../../models');
const validateUserValues = require('./validation').validateUserValues;

let router = express.Router();

router.post('/', validateUserValues, (req, res) => {
	let values = req.body;
	models.User.create({
		provider: 'local',
		email: values.email,
		password: bcrypt.hashSync(values.password, 10),
		UserRoleId: values.UserRoleId
	})
		.then(user => {
			if (user) {
				res.status(201).json({
					message: 'User created successfully.',
					user
				});
			}
			else {
				res.status(500).json({
					error: 'Error with creating a new user.'
				});
			}
		})
		.catch(err => res.status(500).json({
			error: err.message || 'Unknown server error.'
		}));
});

router.get('/:id?', (req, res) => {
	let userId = req.params.id;
	if (userId) {
		models.User.findById(userId, {
			include: [{all: true}]
		})
			.then(user => {
				if (user) {
					res.status(200).json({
						data: user.dataValues
					});
				}
				else {
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
	} else {
		models.User.findAll()
			.then(users => {
				if (users) {
					res.status(200).json({
						data: users
					});
				}
				else {
					res.status(404).json({
						error: 'Not found.'
					});
				}
			})
			.catch(err =>
				res.status(500).json({
					error: err.message || 'Unknown server error.'
				})
			);
	}
});

router.patch('/:id', (req, res) => {
	let userId = req.params.id;
	let newRoleId = req.body.UserRoleId;
	if (newRoleId) {
		models.User.findById(userId)
			.then(user => {
				if (user) {
					user.update({
						UserRoleId: newRoleId
					})
						.then(user => res.status(200).json({
							message: 'User updated successfully',
							user
						}))
						.catch(err => res.status(500).json({
							error: err.message || 'Unknown server error.'
						}));
				}
				else {
					res.status(404).json({
						error: 'User not found'
					});
				}
			})
			.catch(err => res.status(500).json({
				error: err.message || 'Unknown server error.'
			}));
	} else {
		res.status(422).json({
			error: 'User role ID is required.'
		});
	}
});

router.delete('/:id', (req, res) => {
	let userId = req.params.id;
	models.User.destroy({
		where: {
			id: userId
		}
	})
		.then(() =>
			res.status(200).json({
				message: 'User successfully deleted.'
			})
		)
		.catch(err =>
			res.status(500).json({
				error: err.message || 'Unknown server error.'
			})
		);
});

module.exports = router;
