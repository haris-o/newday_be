const validator = require('validator');

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:00)?$/;

const validate = (req, res, next) => {
	try {
		let {
			name,
			startDate,
			endDate,
			startTime,
			endTime,
			location,
			EventTypeId
		} = req.body;

		if (!name || !validator.isLength(name, {min: 3, max: 140})) {
			throw new Error('Event name is required and has to be between 3 and 140 characters.');
		}

		if (!startDate || !validator.toDate(startDate)) {
			throw new Error('Start date must be specified.');
		}

		if (endDate && validator.toDate(startDate) > validator.toDate(endDate)) {
			throw new Error('End date must be after start date.');
		}

		if (startTime && !startTime.match(timeRegex)) {
			throw new Error('Start time must be in 24h HH:MM format.');
		}

		if (endTime && !endTime.match(timeRegex)) {
			throw new Error('End time must be in 24h HH:MM format.');
		}

		if (startTime && !endTime) {
			throw new Error('Start time requires end time.');
		}
		else if (!startTime && endTime){
			throw new Error('End time requires start time.');
		}
		else if(startTime > endTime && (!endDate || new Date(startDate) >= new Date(endDate))){
			throw new Error('Start time must be before end time.');
		}

		if (location && !validator.isLength(location, {min: 3, max: 50})) {
			throw new Error('Location has to be between 3 and 50 characters.');
		}

		if (!EventTypeId) {
			throw new Error('Event type must be specified');
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