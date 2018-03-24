var express = require('express');
var router = express.Router();

/*****
 * auth stavljamo prije provjere tokena jer
 * to je jedini dio API-a koji ne treba token
 *****/
var auth = require('./auth');
router.use('/auth', auth);

router.use(function(req, res, next) {
	if (req.token) {
		next();
	} else {
		return res.status(401).json({
			error: 'Unauthorized access'
		});
	}
});

var user = require('./user');
router.use('/user', user);

module.exports = router;
