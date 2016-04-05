var express = require('express');
var router = express.Router({mergeParams: true});
var comments = require('./comments');
var auth = require('../../../lib/authenticator');

router.get('/', function(req, res) {
  res.send('My posts');
});

router.post('/', auth(), function (req, res) {
	// body...
});

router.get('/:postid', function (req, res) {
	// body...
});

router.put('/:postid', auth(), function (req, res) {
	// body...
	// si usuario logueado coincide con autor del post
		// modificar
	// sino, mandar forbidden
});

router.use('/:postid/comments', comments);

module.exports = router;
