var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var admin = require('./admin');
var api = require('./api');

router.use(
	jwt({ secret: 'newday', requestProperty: 'token' }).unless({
		path: /\/api\/auth\//i
	})
);

router.use('/admin', admin);
router.use('/api', api);

module.exports = router;
