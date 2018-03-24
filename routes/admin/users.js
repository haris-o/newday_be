var models = require('../../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id?', (req, res) => {
	const userId = req.params.id;
	if (userId) {
		models.User.findById(userId, {
			include: [{ all: true }]
		})
			.then(user => {
				res.status(200).json({
					data: user.dataValues
				});
			})
			.catch(error => {
				res.status(500).json({
					error: error
				});
			});
	} else {
		models.User.findAll()
			.then(users =>
				res.status(200).json({
					data: users
				})
			)
			.catch(error =>
				res.status(500).json({
					error: error
				})
			);
	}
});

/* SOFT DELETE a user */
router.delete('/:id', (req, res) => {
	const userId = req.params.id;

	models.User.destroy({
		where: {
			id: userId
		}
	})
		.then(result =>
			res.status(200).json({
				message: 'User deleted.'
			})
		)
		.catch(err =>
			res.status(500).json({
				error: err
			})
		);
});

module.exports = router;
