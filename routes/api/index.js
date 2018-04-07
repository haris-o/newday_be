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

const user = require('./user');
router.use('/user', user);

const details = require('./details');
router.use('/details', details);

const events = require('./events/index');
router.use('/events', events);

module.exports = router;
