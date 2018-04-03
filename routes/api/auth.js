const passport = require('passport');
const express = require('express');
const router = express.Router();

router.post(
	'/login',
	passport.authenticate('local-login', {
		session: false
	}),
	function (req, res) {
		return req.user ? res.status(200).json({
			accessToken: req.user
		}) : res.status(422).json({
			error: 'Invalid data.'
		});
	}
);

router.post(
	'/signup',
	passport.authenticate('local-signup', {
		session: false
	}),
	function (req, res) {
		return req.user ? res.status(201).json({
			accessToken: req.user
		}) : res.status(422).json({
			error: 'Invalid data.'
		});
	}
);

router.get(
	'/facebook',
	passport.authenticate('facebook-token', {
		session: false,
		scope: ['public_profile', 'email']
	}),
	(req, res) => {
		return req.user ? res.status(200).json({
			accessToken: req.user
		}) : res.status(401).json({
			error: 'User not authenticated'
		});
	}
);

router.get(
	'/google',
	passport.authenticate('google-plus-token', {
		session: false
	}),
	(req, res) => {
		return req.user ? res.status(200).json({
			accessToken: req.user
		}) : res.status(401).json({
			error: 'User not authenticated'
		});
	}
);

module.exports = router;
