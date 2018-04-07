const express = require('express');
const router = express.Router();

const models = require('../../../models');

router.get('/', function (req, res) {
	let id = req.token.id;
	models.User.scope('basic').findById(id, {
		include: [{all: true}]
	})
		.then(user => {
			if (user) {
				res.status(200).json({
					data: user
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
			}
			else {
				res.status(404).json({
					error: 'User not found.'
				});
			}
		})
		.catch(err => res.status(500).json({
			error: err.message || 'Error occurred while deleting a user.'
		}));
});

module.exports = router;