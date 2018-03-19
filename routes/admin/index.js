var express = require('express');
var router = express.Router();

/***********
 * Importing all admin routers
 ***********/

var users = require('./users');

/***********
 * Creating API checking mechanism
 ***********/

router.use(function(req, res, next) {
	if (req.token.UserRoleId !== 0) {
		return res.status(401).json({
			error: 'Unauthorized access'
		});
	} else {
		next();
	}
});

router.use('/users', users);

module.exports = router;
