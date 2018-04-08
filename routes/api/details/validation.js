const validator = require('validator');

const validate = (req, res, next) => {
	try {
		let {
			firstName,
			lastName,
			nickname,
			dateOfBirth,
			weight,
			height,
			isFemale
		} = req.body;

		if (firstName && !validator.isAlpha(firstName + '')) {
			throw new Error('First name can only contain letters.');
		}

		if (lastName && !validator.isAlpha(lastName + '')) {
			throw new Error('Last name can only contain letters.')
		}

		if (nickname && !validator.isAscii(nickname + '')) {
			throw new Error('Nickname can only contain letters and numbers.');
		}

		if (dateOfBirth && !validator.toDate(dateOfBirth + '')) {
			throw new Error('Date of birth must be a date.');
		}

		if (weight && !validator.isDecimal(weight + '')) {
			throw new Error('Weight must be a number.');
		}

		if (height && !validator.isDecimal(height + '')) {
			throw new Error('Height must be a number.');
		}

		if (isFemale !== undefined && !validator.isBoolean(isFemale + '')) {
			throw new Error('Gender can only be female or not female.');
		}

		next();
	}
	catch(err){
		res.status(422).json({
			error: err.message
		});
	}
};

module.exports = validate;