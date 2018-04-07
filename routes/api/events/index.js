const express = require('express');
const validator = require('validator');
const models = require('../../models');
const router = express.Router();

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

let validateEventValues = (req, res, next) => {
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
			res.status(422).json({
				error: 'Event name is required and has to be between 3 and 140 characters.'
			});
			return;
		}

		if (!startDate || !validator.toDate(startDate)) {
			res.status(422).json({
				error: 'Start date must be specified.'
			});
			return;
		}

		if (endDate && !validator.toDate(startDate)) {
			res.status(422).json({
				error: 'End date must be a date.'
			});
			return;
		}

		if (endDate && validator.toDate(startDate) > validator.toDate(endDate)) {
			res.status(422).json({
				error: 'End date must be after start date.'
			});
			return;
		}

		if (startTime && !startTime.match(timeRegex)) {
			res.status(422).json({
				error: 'Start time must be in 24h HH:MM format.'
			});
			return;
		}

		if (endTime && !endTime.match(timeRegex)) {
			res.status(422).json({
				error: 'End time must be in 24h HH:MM format.'
			});
			return;
		}

		if (startTime && endTime && startTime > endTime) {
			res.status(422).json({
				error: 'End time must be after start time.'
			});
			return;
		}

		if (location && !validator.isLength(location, {min: 3, max: 50})) {
			res.status(422).json({
				error: 'Location has to be between 3 and 140 characters.'
			});
			return;
		}

		if (!EventTypeId) {
			res.status(422).json({
				error: 'Event type must be specified'
			});
			return;
		}

		next();
	}
	catch (err) {
		res.status(500).json({
			error: err.message
		});
	}
};

router.post('/', validateEventValues, (req, res) => {
	let values = Object.assign({}, req.body, {
		UserId: req.token.id
	});
	models.Event.create(values)
		.then(event => {
			res.status(201).json({
				message: 'Event created successfully',
				data: event
			});
		})
		.catch(err => res.status(500).json({
			error: err.message || 'Error occurred while adding an event.'
		}));
});

router.get('/:id?', (req, res) => {
	let userId = req.token.id;
	let eventId = req.params.id;
	if(eventId) {
		models.Event.findById(eventId, {
			attributes: {
				exclude: ['UserId']
			}
		})
			.then(event => {
				if (event) {
					res.status(200).json({
						data: event
					});
				}
				else {
					res.status(404).json({
						error: 'Event not found.'
					});
				}
			})
			.catch(err => res.status(500).json({
				error: err.message || 'Error occurred while fetching an event.'
			}));
	}
	else{
		models.Event.findAll({
			where: {
				UserId: userId
			},
			attributes: {
				exclude: ['UserId']
			}
		})
			.then(events => {
				if (events) {
					res.status(200).json({
						data: events
					});
				}
				else {
					res.status(404).json({
						error: 'No events found.'
					});
				}
			})
			.catch(err => res.status(500).json({
				error: err.message || 'Error occurred while fetching events.'
			}));
	}
});

router.patch('/:id', validateEventValues, (req, res) => {
	let eventId = req.params.id;
	let userId = req.token.id;
	let values = req.body;
	models.Event.update(values, {
		where: {
			id: eventId,
			UserId: userId
		},
		fields: ['name', 'startDate', 'endDate', 'startTime', 'endTime', 'location', 'details', 'EventTypeId']
	})
		.then(event => {
			if (event) {
				res.status(200).json({
					message: 'Event updated successfully'
				});
			}
			else {
				res.status(404).json({
					error: 'Event not found.'
				});
			}
		})
		.catch(err => res.status(500).json({
			error: err.message || 'Error occurred while updating an event.'
		}));
});

router.delete('/:id', (req, res) => {
	let eventId = req.params.id;
	let userId = req.token.id;
	models.Event.destroy({
		where: {
			id: eventId,
			UserId: userId
		}
	})
		.then(response => {
			if (response) {
				res.status(200).json({
					message: 'Event deleted successfully'
				});
			}
			else {
				res.status(404).json({
					error: 'Event not found.'
				});
			}
		})
		.catch(err => res.status(500).json({
			error: err.message || 'Error occurred while deleting an event.'
		}));
});

module.exports = router;

