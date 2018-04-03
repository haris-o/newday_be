const express = require('express');
let router = express.Router();

let users = require('./users');

router.use(function(req, res, next) {
	if (req.token.UserRoleId !== 0) {
		return res.status(401).json({
			error: 'Unauthorized access.'
		});
	} else {
		next();
	}
});

router.use('/users', users);

module.exports = router;
