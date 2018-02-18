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

router.post('/', (req, res) => {
	const attributes = req.body;
	models.User.create(attributes)
		.then(user =>
			res.status(201).json({
				message: 'User created.',
				data: user
			})
		)
		.catch(error => {
			res.status(400).json({
				error: error
			});
		});
});

router.put('/:id', (req, res) => {
	//edit a user
});

router.delete('/:id', (req, res) => {
	//delete a user
});

module.exports = router;
