const express = require('express');
const models = require('../../../models/index');
const router = express.Router();
const validate = require('./validation');

router.post('/', validate, (req, res) => {
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

router.patch('/:id', validate, (req, res) => {
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

