var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

/*****
 * auth stavljamo prije provjere tokena jer
 * to je jedini dio API-a koji ne treba token
 *****/
var auth = require('./auth');
router.use('/auth', auth);

router.use(function(req, res, next) {
	if (!req.token) {
		return res.status(401).json({
			error: 'Unauthorized access'
		});
	} else {
		next();
	}
});

module.exports = router;
