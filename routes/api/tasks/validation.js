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

		if(!title || validator.isAscii(title)){
			throw new Error('Title is required.');
		}

		if(completed === null || completed === undefined || !validator.isBoolean(completed)){
			throw new Error('Completed can only be true or false');
		}

		if(!date || !validator.isDate(date)){
			throw new Error('Date is missing or in incorrect format.');
		}

		if(!TaskTypeId || !validator.isInt(TaskTypeId)){
			throw new Error('Task type is required.');
		}

		if(!TaskCategoryId && !TaskCategoryName){
			throw new Error('Task category is required.');
		}
		if(TaskCategoryId && TaskCategoryName){
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