const express = require('express');
const router = express.Router();

/*****
 * /auth route goes before token checking
 * it's the only route that doesn't need a token
 *****/
const auth = require('./auth');
router.use('/auth', auth);

router.use(function(req, res, next) {
	if (req.token) {
		next();
	} else {
		return res.status(401).json({
			error: 'Unauthorized access.'
		});
	}
});

const users = require('./users');
router.use('/users', users);

const details = require('./details');
router.use('/details', details);

const events = require('./events');
router.use('/events', events);

const tasks = require('./tasks');
router.use('/tasks', tasks);

const notes = require('./notes');
router.use('/notes', notes);

const quotes = require('./quotes');
router.use('/quotes', quotes);

module.exports = router;
