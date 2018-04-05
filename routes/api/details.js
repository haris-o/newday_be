const express = require('express');
const validator = require('validator');
const models = require('../../models');
const router = express.Router();

let validateUserDetails = (req, res, next) => {
	let {
		firstName,
		lastName,
		nickname,
		dateOfBirth,
		weight,
		height,
		isFemale
	} = req.body;

	if (firstName && !validator.isAlpha(firstName)) {
		res.status(422).json({
			error: 'First name can only contain letters.'
		});
	}

	if(lastName && !validator.isAlpha(lastName)) {
		res.status(422).json({
			error: 'Last name can only contain letters.'
		});
	}

	if(nickname && !validator.isAlphanumeric(nickname)) {
		res.status(422).json({
			error: 'Nickname can only contain letters and numbers.'
		});
	}

	if(dateOfBirth && !validator.toDate(dateOfBirth)) {
		res.status(422).json({
			error: 'Date of birth must be a date.'
		});
	}

	if(weight && !validator.isDecimal(weight)) {
		res.status(422).json({
			error: 'Weight must be a number.'
		});
	}

	if(height && !validator.isDecimal(height)) {
		res.status(422).json({
			error: 'Height must be a number.'
		});
	}

	if(isFemale === undefined && !validator.isBoolean(isFemale)) {
		res.status(422).json({
			error: 'Gender can only be female or not female.'
		});
	}

	next();
};

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

router.patch('/', validateUserDetails, (req, res) => {
	let values = req.body;
	let userId = req.token.id;
	models.UserDetail.update(values, {
		where: {
			UserId: userId
		}
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

