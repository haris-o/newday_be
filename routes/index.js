const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const admin = require('./admin');
const api = require('./api');

router.use(
	jwt({ secret: 'newday', requestProperty: 'token' }).unless({
		path: /\/api\/auth\//i
	})
);

router.use('/admin', admin);
router.use('/api', api);

module.exports = router;
