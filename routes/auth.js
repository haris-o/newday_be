var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var createToken = function(auth) {
	return jwt.sign(
		{
			user: auth
		},
		'newday'
	);
};

var generateToken = function(req, res, next) {
	req.token = createToken(req.auth);
	next();
};

var sendToken = function(req, res) {
	res.status(200).json({
		token: req.auth
	});
};

var authenticate = expressJwt({
	secret: 'newday',
	requestProperty: 'auth',
	getToken: function(req) {
		if (req.headers['x-auth-token']) {
			return req.headers['x-auth-token'];
		}

		return null;
	}
});

router.post('/login', (req, res, next) => {});

router.post('/registration', (req, res) => {});

module.exports = router;
