var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', (req, res, next) => {
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
});

router.post('/', (req, res, next) => {
	//add a new user
});

router.put('/:id', (req, res, next) => {
	//edit a user
});

router.delete('/:id', (req, res, next) => {
	//delete a user
});

module.exports = router;
