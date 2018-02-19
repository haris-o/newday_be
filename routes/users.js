var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
	models.User.findAll({
		include: [models.UserDetail, models.UserRole]
	})
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
});

/* SOFT DELETE a user */
router.delete('/:id', (req, res) => {
	const userId = req.params.id;

	models.User.update(
		{
			active: false
		},
		{
			where: {
				id: userId
			}
		}
	)
		.then(result =>
			res.status(200).json({
				message: 'User deleted.',
				originalMessage: result
			})
		)
		.catch(err =>
			res.status(500).json({
				error: err
			})
		);
});

module.exports = router;
