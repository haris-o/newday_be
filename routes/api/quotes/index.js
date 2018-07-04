const express = require('express');
const models = require('../../../models/index');
const router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
	models.Quote.count()
		.then(n => {
			let dayOfYear = moment().dayOfYear();
			let quoteId = dayOfYear % n;
			models.Quote.findById(quoteId)
				.then(quote => {
					if(quote){
						res.status(200).json({
							data: quote
						});
					}
					else{
						res.status(404).json({
							error: 'Quote not found.'
						});
					}
				})
				.catch(err => res.status(500).json({
					error: err.message
				}));
		})
		.catch(err => res.status(500).json({
			error: err.message
		}));
});

module.exports = router;