const express = require('express');
const validate = require('./validation');
const models = require('../../../models/index');
const router = express.Router();

router.get('/', (req, res) => {
	let userId = req.token.id;
	models.UserDetail.findById(userId)
		.then(details => {
			if(details){
				res.status(200).json({
					data: details
				});
			}
			else{
				res.status(404).json({
					error: 'User details not found'
				});
			}
		})
		.catch(err => res.status(500).json({
			error: err.message || 'Unknown server error.'
		}));
});

router.patch('/', validate, (req, res) => {
	let values = req.body;
	let userId = req.token.id;
	models.UserDetail.update(values, {
		where: {
			UserId: userId
		},
		fields: ['firstName', 'lastName', 'nickname', 'dateOfBirth', 'weight', 'height', 'isFemale']
	})
		.then(() => {
			res.status(200).json({
				message: 'User details updated successfully'
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err.message || 'Error while updating user details'
			});
		});
});

module.exports = router;

