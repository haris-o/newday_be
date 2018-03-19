var passport = require('passport');
var express = require('express');
var router = express.Router();

var models = require('../../models');

router.get('/me', function(req, res) {
	let id = req.token.id;
	models.User.findById(id, {
		include: [{ all: true }]
	})
		.then(user => {
			res.status(200).json({
				data: user
			});
		})
		.catch(err => {
			console.log(err);
			res.status(401).json({
				error: 'Database error'
			});
		});
});

router.post(
	'/login',
	passport.authenticate('local-login', {
		session: false
	}),
	function(req, res) {
		if (!req.user) {
			return res.status(401).json({
				error: 'Email not found'
			});
		} else {
			return res.status(200).json({
				accessToken: req.user
			});
		}
	}
);

router.post(
	'/signup',
	passport.authenticate('local-signup', {
		session: false
	}),
	function(req, res) {
		if (!req.user) {
			return res.status(422).json({
				error: 'Invalid data'
			});
		} else {
			return res.status(201).json({
				accessToken: req.user
			});
		}
	}
);

router.get(
	'/facebook',
	passport.authenticate('facebook-token', {
		session: false,
		scope: ['public_profile', 'email']
	}),
	(req, res) => {
		if (!req.user) {
			return res.status(401).json({
				error: 'User not authenticated'
			});
		} else {
			return res.status(200).json({
				accessToken: req.user
			});
		}
	}
);

router.get(
	'/google',
	passport.authenticate('google-plus-token', {
		session: false
	}),
	(req, res) => {
		if (!req.user) {
			return res.status(401).json({
				error: 'User not authenticated'
			});
		} else {
			return res.status(200).json({
				accessToken: req.user
			});
		}
	}
);

module.exports = router;
