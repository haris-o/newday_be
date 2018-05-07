const express = require('express');
const models = require('../../../models/index');
const router = express.Router();
const validate = require('./validation');

router.post('/', validate, (req, res) => {
	let values = Object.assign({}, req.body, {
		UserId: req.token.id
	});
	models.Note.create(values)
		.then(
			note => res.status(201).json({
				message: 'Note created successfully.',
				data: note
			}))
		.catch(err => res.status(500).json({
			error: err.message || 'Error occurred while adding a note.'
		}));
});

router.get('/:id?', (req, res) => {
	let userId = req.token.id;
	let noteId = req.params.id;
	if(noteId){
		models.Note.findById(noteId, {
			attributes: {
				exclude: ['UserId']
			}
		})
			.then(note => {
				if(note){
					res.status(200).json({
						data: event
					});
				}
				else{
					res.status(404).json({
						error: 'Event not found.'
					});
				}
			})
			.catch(err => res.status(500).json({
				error: err.message || 'Error occurred while fetching a note.'
			}));
	}
	else{
		models.Note.findAll({
			where: {
				UserId: userId
			},
			attributes: {
				exclude: ['UserId']
			}
		})
			.then(notes => {
				if(notes){
					res.status(200).json({
						data: notes
					});
				}
				else{
					res.status(404).json({
						error: 'No notes found.'
					});
				}
			})
			.catch(err => res.status(500).json({
				error: err.message || 'Error occurred while fetching notes.'
			}));
	}
});

router.patch('/id', validate, (req, res) => {
	let noteId = req.params.id;
	let userId = req.token.id;
	let values = req.body;
	models.Note.update(values, {
		where: {
			id: eventId,
			UserId: userId
		},
		fields: ['title', 'body']
	})
		.then(note => {
			if (note) {
				res.status(200).json({
					message: 'Note updated successfully'
				});
			}
			else {
				res.status(404).json({
					error: 'Note not found.'
				});
			}
		})
		.catch(err => res.status(500).json({
			error: err.message || 'Error occurred while updating a note.'
		}));
});

router.delete('/:id', (req, res) => {
	let noteId = req.params.id;
	let userId = req.token.id;
	models.Note.destroy({
		where: {
			id: noteId,
			UserId: userId
		}
	})
		.then(response => {
			if (response) {
				res.status(200).json({
					message: 'Note deleted successfully'
				});
			}
			else {
				res.status(404).json({
					error: 'Note not found.'
				});
			}
		})
		.catch(err => res.status(500).json({
			error: err.message || 'Error occurred while deleting a note.'
		}));
});

