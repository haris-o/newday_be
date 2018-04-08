const validator = require('validator');

const validate = (req, res, next) => {
	try {
		let {
			title,
			completed,
			date,
			TaskTypeId,
			TaskCategoryId,
			TaskCategoryName
		} = req.body;

		if (!title || !validator.isLength(title + '', {min: 3, max: 50})) {
			throw new Error('Title is required.');
		}

		if (!date || !validator.toDate(date + '')) {
			throw new Error('Date is missing or in incorrect format.');
		}

		if (!TaskTypeId || !validator.isInt(TaskTypeId + '')) {
			throw new Error('Task type is required.');
		}

		if (!TaskCategoryId && !TaskCategoryName) {
			throw new Error('Task category is required.');
		}
		if (TaskCategoryId && TaskCategoryName) {
			throw new Error('Unable to create a new category when current category is selected.');
		}

		next();
	}
	catch (err) {
		res.status(422).json({
			error: err.message
		});
	}
};

module.exports = validate;