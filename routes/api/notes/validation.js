const validator = require('validator');

const validate = (req, res, next) => {
	try {
		let { title, body } = req.body;

		if(!title || !validator.isLength(title + '', { min: 3, max: 50})){
			throw new Error('Note title is required and must be between 3 and 50 characters');
		}

		if(!body){
			throw new Error('Note body is required.');
		}

		next();
	}
	catch(err){
		res.status(422).json({
			error: err.message
		});
	}
}

module.exports = validate;