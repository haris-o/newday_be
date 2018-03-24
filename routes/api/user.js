const express = require('express');
const router = express.Router();

const models = require('../../models');

router.get('/me', function(req, res) {
	let id = req.token.id;
	models.User.scope('basic').findById(id, {
		include: [models.UserDetail]
	})
		.then(user => {
			if(user) {
				res.status(200).json({
					data: user
				});
			}
			else {
				res.status(404).json({
					error: 'User not found'
				})
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: 'Database error'
			});
		});
});

module.exports = router;