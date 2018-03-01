var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get(
	'/facebook',
	passport.authenticate('facebook-token', {
		session: false,
		scope: ['public_profile', 'email']
	}),
	(req, res) => {
		console.log(req);
		if (!req.user) {
			return res.status(401).json({
				error: 'User not authenticated'
			});
		} else {
			return res.status(200).json({
				data: req.user
			});
		}
	}
);

module.exports = router;
